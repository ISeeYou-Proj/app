import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import Record from '../components/Record';
import {getStorage} from '../utils/asyncstorage';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {API_URL} from '../utils/apiurl';
import Sound from 'react-native-sound';

export default function ScreenshotPage(): React.JSX.Element {
  const captureRef = useRef<ViewShot | null>(null);
  const webViewRef = useRef<WebView | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [captureImg, setCaptureImg] = useState<string>('');

  const [response, setResponse] = useState<string>('');
  const [changeBase64, setChangeBase64] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [prevBase64Img, setPrevBase64Img] = useState<string>('');

  useEffect(() => {
    console.log('changeBase64: ', changeBase64);
  }, [changeBase64]);

  useEffect(() => {
    if (captureImg === '' || loading) {
      console.log(
        'captureImg가 비어있거나 loading중이므로 useWebviewPostImg 훅을 early return 합니다.',
      );
      return;
    }

    const uploadImage = async () => {
      try {
        setLoading(true);
        const displayMode = await getStorage('displayMode');
        const ttsSpeed = await getStorage('ttsSpeed');
        const base64Img = await RNFS.readFile(captureImg, 'base64');
        setPrevBase64Img(`data:image/png;base64,${base64Img}`);

        const imgApiEndpoint =
          displayMode === 'totallyBlind'
            ? '/webviewimage/totallyblind'
            : '/webviewimage/lowvision';
        console.log('imgApiEndpoint', imgApiEndpoint);
        const postResponse = await axios.post(`${API_URL}${imgApiEndpoint}`, {
          image: `data:image/png;base64,${base64Img}`,
          displayMode: displayMode,
          ttsSpeed: ttsSpeed,
        });
        const {
          msg,
          mp3,
          image: changeBase64,
        }: {msg: string; mp3: string; image: string} = postResponse.data;
        console.log('msg: ', msg, 'mp3: ', mp3);
        setResponse(msg);
        setChangeBase64(changeBase64);

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
      } catch (e) {
        console.error('POST API에서 에러 발생', e);
        setLoading(false);
      } finally {
        resetCaptureImage();
      }
    };
    uploadImage();
  }, [captureImg]);

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
          onPress={goBack}
          className="p-1 m-1 flex justify-center items-center">
          <Image
            source={require('../assets/back_btn.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takeScreenShot}
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
      <Modal visible={isModalVisible}>
        <View className="absolute top-10 w-full h-full bg-white flex justify-center items-center">
          {changeBase64 === '' ? (
            <></>
          ) : (
            <Image
              className="w-1/2 h-1/2 scale-150 mb-12"
              source={{uri: changeBase64}}
              resizeMode="contain"
            />
          )}

          <Text className="text-lg mx-6">{response}</Text>
          <TouchableOpacity
            onPress={handleModalVisible}
            className="p-2 m-2 bg-custom-deepblue rounded-lg flex justify-center items-center">
            <Text className="text-xl text-custom-white">Close</Text>
          </TouchableOpacity>
          <Record
            prevAnswer={response}
            setPrevAnswer={setResponse}
            prevBase64Img={prevBase64Img}
            width="8"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
