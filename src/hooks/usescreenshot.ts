import {useCallback, useEffect, useState} from 'react';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {getStorage} from '../utils/asyncstorage';
import {getWebviewApiEndpoint} from '../utils/getapiendpoint';
import axios from 'axios';
import {API_URL} from '../utils/apiurl';
import {useModalState} from './usemodalstate';
import {playMp3File} from '../utils/playmp3file';

export const useScreenshot = (
  captureRef: React.MutableRefObject<ViewShot | null>,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {isModalVisible, toggleModalState} = useModalState();
  const [captureImg, setCaptureImg] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [reqBase64Img, setReqBase64Img] = useState<string>('');
  const [resBase64Img, setResBase64Img] = useState<string>('');

  const resetScreenshotState = () => {
    console.log('resetScreenshotState 함수 시작');
    setAnswer('');
    setReqBase64Img('');
    setResBase64Img('');
    setCaptureImg('');
  };

  /**
   * @description 스크린샷 촬영 후 이미지 경로를 생성해서 captureImg 상태 업데이트하고 모달을 여는 함수
   */
  const takeScreenshot = useCallback(() => {
    if (captureRef.current?.capture) {
      setIsLoading(true);
      captureRef.current
        .capture()
        .then((uri: string) => {
          setCaptureImg('file://' + uri);
        })
        .catch(e => {
          console.log('takeScreenshot 함수 에러: ', e);
        });
    }
  }, []);

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const displayMode = await getStorage('displayMode');
        const ttsSpeed = await getStorage('ttsSpeed');
        const base64Img = await RNFS.readFile(captureImg, 'base64');
        setCaptureImg('');
        setReqBase64Img(`data:image/png;base64,${base64Img}`);
        const endpoint = getWebviewApiEndpoint(displayMode);
        const response = await axios.post(`${API_URL}${endpoint}`, {
          image: `data:image/png;base64,${base64Img}`,
          displayMode: displayMode,
          ttsSpeed: ttsSpeed,
        });
        // todo: setTimeout은 제거할 예정
        setTimeout(() => {
          const {msg, mp3, image}: {msg: string; mp3: string; image?: string} =
            response.data;
          console.log('msg: ', msg, 'mp3: ', mp3, 'image: ');
          setAnswer(msg);
          if (image) {
            setResBase64Img(image);
          } else {
            setResBase64Img(`data:image/png;base64,${base64Img}`);
          }
          setIsLoading(false);
          playMp3File(mp3);
          toggleModalState();
        }, 2000);
      } catch (e) {
        console.log('uploadImage 함수 에러 발생: ', e);
      }
    };
    if (captureImg !== '') {
      uploadImage();
    }
  }, [captureImg]);

  return {
    answer,
    setAnswer,
    isLoading,
    isModalVisible,
    toggleModalState,
    reqBase64Img,
    resBase64Img,
    takeScreenshot,
    resetScreenshotState,
  };
};
