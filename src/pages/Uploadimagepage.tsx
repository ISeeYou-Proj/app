import axios from 'axios';
import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
import ImagePicker from 'react-native-image-crop-picker';
import {API_URL} from '../utils/apiurl';
import {useIsFocused} from '@react-navigation/native';
import {useVolumeUpDown} from '../hooks/usevolumeupdown';
import {useStt} from '../hooks/usestt';

export default function UploadImagePage(): React.JSX.Element {
  const isUploadImagePageActive = useIsFocused();
  const [prevBase64Img, setPrevBase64Img] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const {volumeBtnState, resetVolumeState} = useVolumeUpDown({
    initialVolume: 0.5,
  });

  const getImage = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 480,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        if (loading) {
          // 이미지 첨부 후 너무 빠르게 다시 첨부하면, 무시
          return;
        }
        console.log('selected image name: ', image.filename);
        setPrevBase64Img(`data:${image.mime};base64,${image.data}`);
        setLoading(true);

        axios
          .post(`${API_URL}/webviewimage/totallyblind`, {
            image: `data:${image.mime};base64,${image.data}`,
          })
          .then(res => {
            const {msg, mp3}: {msg: string; mp3: string} = res.data;
            console.log('msg: ', msg, 'mp3: ', mp3);
            setAiResponse(msg);

            const ttsMp3 = new Sound(`${API_URL}${mp3}`, undefined, error => {
              if (error) {
                console.log('Error loading sound: ' + error);
                setLoading(false);
                return;
              }
              ttsMp3.play(success => {
                if (success) {
                  console.log('성공적으로 재생되었습니다.');
                  ttsMp3.release();
                  setLoading(false);
                } else {
                  console.log('재생 중 오류가 발생했습니다.');
                  setLoading(false);
                }
              });
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 볼륨 업버튼 클릭 시 녹음 시작하고, 다시 클릭 시 녹음 종료하는 훅, 서버로 post 요청을 하고 결과도 반환
  const {recognizedText, isRecording} = useStt({
    isActive: isUploadImagePageActive,
    prevAnswer: aiResponse,
    prevBase64Img: prevBase64Img,
    setPrevAnswer: setAiResponse,
    volumeBtnState: volumeBtnState,
    resetVolumeState: resetVolumeState,
  });

  return (
    <View className="w-full h-full flex justify-center items-center">
      <Text className="text-xl text-custom-black">
        업로드 이미지 페이지 입니다.
      </Text>
      <Text className="text-xl text-custom-black">
        녹음중?: {JSON.stringify(isRecording)}
      </Text>
      {isRecording ? (
        <Text className="text-xl text-custom-black">
          녹음중: {recognizedText}
        </Text>
      ) : (
        <View />
      )}
      {prevBase64Img === '' ? (
        <View />
      ) : (
        <Image
          source={{uri: prevBase64Img}}
          resizeMode="center"
          className="w-48 h-48"
        />
      )}
      <TouchableOpacity
        onPress={getImage}
        className="w-48 p-4 m-4 bg-custom-blue items-center rounded-2xl">
        <Text className="text-custom-white">이미지 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
}
