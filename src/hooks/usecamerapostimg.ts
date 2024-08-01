import axios from 'axios';
import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {API_URL} from '../utils/apiurl';

interface Props {
  imagePath: string;
  resetImgPath: () => void;
  setPrevBase64Img: React.Dispatch<React.SetStateAction<string>>;
  setPrevAnswer: React.Dispatch<React.SetStateAction<string>>;
}

// 이미지 경로를 입력받아 base64로 인코딩해서 서버로 전송
export const useCameraPostImg = ({
  imagePath,
  resetImgPath,
  setPrevBase64Img,
  setPrevAnswer,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 이미지 경로가 비어있거나, 이전 요청이 존재하면 현재 요청을 무시
    if (imagePath === '' || loading) return;

    const uploadImage = async () => {
      try {
        setLoading(true);
        const base64Img = await RNFS.readFile(imagePath, 'base64');
        setPrevBase64Img(`data:image/png;base64,${base64Img}`);
        const postResponse = await axios.post(`${API_URL}/cameraimage`, {
          image: `data:image/png;base64,${base64Img}`,
        });
        const {msg, mp3}: {msg: string; mp3: string} = postResponse.data;
        console.log('msg: ', msg, 'mp3: ', mp3);
        setPrevAnswer(msg);

        const ttsMp3 = new Sound(`${API_URL}${mp3}`, undefined, error => {
          if (error) {
            console.log('Error loading sound: ' + error);
            return;
          }
          ttsMp3.play(success => {
            if (success) {
              console.log('성공적으로 재생되었습니다.');
              ttsMp3.release();
              setLoading(false);
            } else {
              console.log('재생 중 오류가 발생했습니다.');
            }
          });
        });
      } catch (e) {
        console.error('POST API에서 에러 발생', e);
      } finally {
        resetImgPath();
      }
    };
    uploadImage();
  }, [imagePath]);

  useEffect(() => {
    console.log('loading: ', loading);
  }, [loading]);
};
