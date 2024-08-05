import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Modal} from 'react-native';
import Sound from 'react-native-sound';
import ImagePicker from 'react-native-image-crop-picker';
import {API_URL} from '../utils/apiurl';
import {useIsFocused} from '@react-navigation/native';
import Record from '../components/Record';
import {getStorage} from '../utils/asyncstorage';

export default function UploadImagePage(): React.JSX.Element {
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [prevBase64Img, setPrevBase64Img] = useState<string>('');
  const [changeBase64Img, setChangeBase64Img] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev);
  };

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
        handleModalVisible();
        setPrevBase64Img(`data:${image.mime};base64,${image.data}`);
        setLoading(true);

        getStorage('displayMode').then(displayMode => {
          const imgApiEndpoint =
            displayMode === 'totallyBlind'
              ? '/webviewimage/totallyblind'
              : '/webviewimage/lowvision';

          axios
            .post(`${API_URL}${imgApiEndpoint}`, {
              image: `data:${image.mime};base64,${image.data}`,
              displayMode: displayMode,
              ttsSpeed: '1.0',
            })
            .then(res => {
              const {
                msg,
                mp3,
                image,
              }: {msg: string; mp3: string; image?: string} = res.data;
              console.log('msg: ', msg, 'mp3: ', mp3);
              setAiResponse(msg);
              if (image) {
                setChangeBase64Img(image);
              }
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
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getImage();
    }
  }, [isFocused]);

  return (
    <View className="w-full h-full pt-4 flex justify-center items-center bg-white">
      {prevBase64Img === '' ? (
        <View />
      ) : (
        <Modal visible={isModalVisible}>
          <View className="absolute top-10 w-full h-full bg-white flex justify-center items-center">
            {changeBase64Img === '' ? (
              <></>
            ) : (
              <Image
                className="w-1/2 h-1/2 scale-150 mb-12"
                source={{uri: changeBase64Img}}
                resizeMode="contain"
              />
            )}

            <Text className="text-lg mx-6">{aiResponse}</Text>
            <TouchableOpacity
              onPress={handleModalVisible}
              className="p-2 m-2 bg-custom-deepblue rounded-lg flex justify-center items-center">
              <Text className="text-xl text-custom-white">Close</Text>
            </TouchableOpacity>
            <Record
              prevAnswer={aiResponse}
              setPrevAnswer={setAiResponse}
              prevBase64Img={prevBase64Img}
              width="8"
            />
          </View>
        </Modal>
      )}
      <TouchableOpacity
        className="bg-custom-skyblue p-4 rounded-2xl flex flex-row justify-center items-center"
        onPress={getImage}>
        <Image
          source={require('../assets/save_setting.png')}
          className="w-8 h-8 mr-2"
          resizeMode="contain"
        />
        <Text className="ml-2 text-lg font-bold text-custom-black">
          이미지 업로드
        </Text>
      </TouchableOpacity>
    </View>
  );
}
