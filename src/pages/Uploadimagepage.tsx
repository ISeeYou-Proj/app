import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {API_URL} from '../utils/apiurl';
import {useFocusEffect} from '@react-navigation/native';
import {getStorage} from '../utils/asyncstorage';
import {useRecord} from '../hooks/userecord';
import {getWebviewApiEndpoint} from '../utils/getapiendpoint';
import {playMp3File} from '../utils/playmp3file';
import Loadingspinner from '../components/Loadingspinner';
import ResultModal from '../components/Resultmodal';

export default function UploadImagePage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [reqBase64Img, setReqBase64Img] = useState<string>('');
  const [resBase64Img, setResBase64Img] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  // 음성 인식 커스텀 훅
  const {isRecordLoading, recordFlag, toggleRecordFlag, resetSttState} =
    useRecord(answer, setAnswer, reqBase64Img);

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev);
  };

  const getImage = async () => {
    try {
      const pickImg = await ImagePicker.openPicker({
        compressImageMaxWidth: 720,
        compressImageMaxHeight: 480,
        cropping: false,
        includeBase64: true,
        compressImageQuality: 0.6,
        mediaType: 'photo',
      });
      console.log('selected image name: ', pickImg.filename);
      setIsLoading(true);
      setReqBase64Img(`data:${pickImg.mime};base64,${pickImg.data}`);
      const displayMode = await getStorage('displayMode');
      const endpoint = getWebviewApiEndpoint(displayMode);
      const response = await axios.post(`${API_URL}${endpoint}`, {
        image: `data:${pickImg.mime};base64,${pickImg.data}`,
        displayMode: displayMode,
        ttsSpeed: '1.0',
      });
      const {msg, mp3, image}: {msg: string; mp3: string; image?: string} =
        response.data;
      console.log('msg: ', msg, 'mp3: ', mp3);
      setAnswer(msg);
      if (image) {
        setResBase64Img(image);
      } else {
        setResBase64Img(`data:${pickImg.mime};base64,${pickImg.data}`);
      }
      setIsLoading(false);
      playMp3File(mp3);
      setIsModalVisible(true);
    } catch (e) {
      console.log('getImage 함수 에러 발생: ', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getImage();
    }, []),
  );

  return (
    <View className="w-full h-full pt-4 flex justify-center items-center bg-white">
      <Loadingspinner isLoading={isLoading} />
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

      <ResultModal
        isModalVisible={isModalVisible}
        isLoading={isLoading}
        isRecordLoading={isRecordLoading}
        recordFlag={recordFlag}
        reqBase64Img={reqBase64Img}
        resBase64Img={resBase64Img}
        answer={answer}
        toggleModalState={handleModalVisible}
        toggleRecordFlag={toggleRecordFlag}
      />
    </View>
  );
}
