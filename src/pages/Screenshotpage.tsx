import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import ViewShot from 'react-native-view-shot';
import {useRecord} from '../hooks/userecord';
import {useScreenshot} from '../hooks/usescreenshot';
import ResultModal from '../components/Resultmodal';
import {useNavigation} from '@react-navigation/native';
import Loadingspinner from '../components/Loadingspinner';

export default function ScreenshotPage(): React.JSX.Element {
  const navigation = useNavigation();
  const captureRef = useRef<ViewShot | null>(null);
  const webViewRef = useRef<WebView | null>(null);

  // 스크린샷 커스텀 훅
  const {
    answer,
    setAnswer,
    isLoading,
    isModalVisible,
    toggleModalState,
    reqBase64Img,
    resBase64Img,
    takeScreenshot,
    resetScreenshotState,
  } = useScreenshot(captureRef);

  // 음성 인식 커스텀 훅
  const {isRecordLoading, recordFlag, toggleRecordFlag, resetSttState} =
    useRecord(answer, setAnswer, reqBase64Img);

  // Focus가 blur 되면 state를 리셋
  useEffect(
    () =>
      navigation.addListener('blur', () => {
        console.log('ScreenshotPage blur 되어 state들을 초기화합니다.');
        resetScreenshotState();
        resetSttState();
      }),
    [],
  );

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

  return (
    <SafeAreaView className="w-full h-full relative bg-white">
      <Loadingspinner isLoading={isLoading} />
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
      <View className="w-full h-14 absolute bottom-0 mt-4 flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={goBack}
          className="p-1 m-1 flex justify-center items-center">
          <Image
            source={require('../assets/back_btn.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takeScreenshot}
          className="p-2 m-2 flex justify-center items-center">
          <Image
            source={require('../assets/camera_bold.png')}
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
      </View>
      <ResultModal
        isModalVisible={isModalVisible}
        isLoading={isLoading}
        isRecordLoading={isRecordLoading}
        recordFlag={recordFlag}
        reqBase64Img={reqBase64Img}
        resBase64Img={resBase64Img}
        answer={answer}
        toggleModalState={toggleModalState}
        toggleRecordFlag={toggleRecordFlag}
      />
    </SafeAreaView>
  );
}
