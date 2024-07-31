import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import ViewShot from 'react-native-view-shot';
import {useStt} from '../hooks/usestt';
import {useIsFocused} from '@react-navigation/native';
import {useVolumeUpDown} from '../hooks/usevolumeupdown';
import {useWebviewPostImg} from '../hooks/usewebviewpostimg';

export default function ScreenshotPage(): React.JSX.Element {
  const isWebviewActive = useIsFocused();
  const captureRef = useRef<ViewShot | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [captureImg, setCaptureImg] = useState<string>('');
  const {volumeBtnState, resetVolumeState} = useVolumeUpDown({
    initialVolume: 0.5,
  });

  const resetCaptureImage = () => {
    setCaptureImg('');
  };

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev);
  };

  // 볼륨 다운 버튼 클릭 시 화면 캡쳐
  useEffect(() => {
    if (isWebviewActive && volumeBtnState === 'DOWN') {
      takeScreenShot();
      resetVolumeState();
      console.log('Effect 실행');
    }
  }, [volumeBtnState]);

  // 화면 캡쳐를 감지 -> 스크린샷을 base64로 인코딩해서 서버로 전송 -> 응답 처리하는 훅
  const {
    response: aiCaptureResult,
    setResponse: setAiCaptureResult,
    prevBase64Img: prevBase64Img,
  } = useWebviewPostImg({captureImg, resetCaptureImage});

  // 볼륨 업버튼 클릭 시 녹음 시작하고, 다시 클릭 시 녹음 종료하는 훅, 서버로 post 요청을 하고 결과도 반환
  const {recognizedText, isRecording} = useStt({
    isActive: isWebviewActive,
    prevAnswer: aiCaptureResult,
    prevBase64Img: prevBase64Img,
    setPrevAnswer: setAiCaptureResult,
    volumeBtnState: volumeBtnState,
    resetVolumeState: resetVolumeState,
  });

  useEffect(() => {
    console.log('captureImg: ', captureImg);
  }, [captureImg]);

  const takeScreenShot = useCallback(() => {
    if (captureRef.current?.capture) {
      captureRef.current
        .capture()
        .then((uri: string) => {
          setCaptureImg('file://' + uri);
          setIsModalVisible(prev => !prev);
        })
        .catch((error: string) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <View className="w-full h-full">
      <View className="w-full h-3/4">
        <ViewShot
          ref={captureRef}
          options={{format: 'jpg', quality: 0.9}}
          style={{width: '100%', height: '100%'}}>
          <WebView
            source={{
              uri: 'https://prod.danawa.com/list/?cate=112758&15main_11_02=',
            }}
            style={{width: '100%', height: '75%'}}
          />
        </ViewShot>
      </View>
      <View className="w-full h-1/4 mt-4 flex justify-center items-center">
        <Text className="text-xl">음성인식: {recognizedText}</Text>
        <Text className="text-xl">
          현재 음성인식중?: {isRecording.toString()}
        </Text>
        <TouchableOpacity
          onPress={takeScreenShot}
          className="p-2 m-2 bg-custom-deepblue rounded-lg flex justify-center items-center">
          <Text className="text-custom-white">캡쳐 버튼</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible}>
        <View className="w-full h-full bg-custom-skyblue flex justify-center items-center">
          <Image
            className="w-1/2 h-1/2 scale-75"
            src={captureImg}
            resizeMode="contain"
          />
          <Text className="text-xl">{aiCaptureResult}</Text>
          <TouchableOpacity
            onPress={handleModalVisible}
            className="p-2 m-2 bg-custom-deepblue rounded-lg flex justify-center items-center">
            <Text className="text-xl text-custom-white">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
