import axios from 'axios';
import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {API_URL} from '../utils/apiurl';

interface Props {
  captureImg: string;
  resetCaptureImage: () => void;
}

// 이미지 경로를 입력받아 base64로 인코딩해서 서버로 전송
export const useWebviewPostImg = ({captureImg, resetCaptureImage}: Props) => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [prevBase64Img, setPrevBase64Img] = useState<string>('');

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
        const base64Img = await RNFS.readFile(captureImg, 'base64');
        setPrevBase64Img(`data:image/png;base64,${base64Img}`);

        const postResponse = await axios.post(
          `${API_URL}/webviewimage/totallyblind`,
          {
            image: `data:image/png;base64,${base64Img}`,
          },
        );
        const {msg, mp3}: {msg: string; mp3: string} = postResponse.data;
        console.log('msg: ', msg, 'mp3: ', mp3);
        setResponse(msg);

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

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);

  return {response, setResponse, prevBase64Img};
};
