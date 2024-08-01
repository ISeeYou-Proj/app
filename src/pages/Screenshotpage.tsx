import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import ViewShot from 'react-native-view-shot';
import {useWebviewPostImg} from '../hooks/usewebviewpostimg';
import Record from '../components/Record';

export default function ScreenshotPage(): React.JSX.Element {
  const captureRef = useRef<ViewShot | null>(null);
  const webViewRef = useRef<WebView | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [captureImg, setCaptureImg] = useState<string>('');

  const resetCaptureImage = () => {
    setCaptureImg('');
  };

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev);
  };

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const goForward = () => {
    if (webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  // 화면 캡쳐를 감지 -> 스크린샷을 base64로 인코딩해서 서버로 전송 -> 응답 처리하는 훅
  const {
    response: aiCaptureResult,
    setResponse: setAiCaptureResult,
    prevBase64Img: prevBase64Img,
  } = useWebviewPostImg({captureImg, resetCaptureImage});

  /**
   * @description 스크린샷 촬영 후 이미지 경로를 생성해서 captureImg 상태 업데이트하고 모달을 여는 함수
   */
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
    <SafeAreaView className="w-full h-full relative bg-white">
      <View className="w-full h-5/6 mt-12">
        <ViewShot
          ref={captureRef}
          options={{format: 'jpg', quality: 0.9}}
          style={{width: '100%', height: '100%'}}>
          <WebView
            ref={webViewRef}
            source={{
              uri: 'https://www.naver.com/',
            }}
            style={{width: '100%', height: '75%'}}
          />
        </ViewShot>
      </View>
      <View className="w-full h-14 absolute bottom-0 mt-4 mx-2 flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={takeScreenShot}
          className="p-2 m-2 flex justify-center items-center">
          <Image
            source={require('../assets/camera_bold.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goBack}
          className="p-1 m-1 flex justify-center items-center">
          <Image
            source={require('../assets/back_btn.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goForward}
          className="p-1 m-1 flex justify-center items-center">
          <Image
            source={require('../assets/front_btn.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <Record
          prevAnswer={aiCaptureResult}
          setPrevAnswer={setAiCaptureResult}
          prevBase64Img={prevBase64Img}
          width="8"
        />
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
    </SafeAreaView>
  );
}
