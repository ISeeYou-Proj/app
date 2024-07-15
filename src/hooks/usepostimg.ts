import axios from 'axios';
import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

interface Props {
  imagePath: string;
  resetImgPath: () => void;
}

// 이미지 경로를 입력받아 base64로 인코딩해서 서버로 전송
export const usePostImg = ({imagePath, resetImgPath}: Props) => {
  const [response, setResponse] = useState<string>('');
  const [testCnt, setTestCnt] = useState<number>(0);

  useEffect(() => {
    if (!imagePath) return;

    const uploadImage = async () => {
      try {
        const base64Img = await RNFS.readFile(imagePath, 'base64');
        // const res = await axios.post(
        //   'https://mock_e65979fe955645f187eca0906af61c16.mock.insomnia.rest/postimg',
        //   {image: base64Img},
        // );
        // setResponse(res.data);
        // Alert.alert('Success', res.data);
        setTimeout(() => {
          setResponse('AI의 응답을 받았다 가정 ' + testCnt.toString());
          setTestCnt(prev => (prev += 1));
        }, 1000);
      } catch (e) {
        console.error('POST API에서 에러 발생', e);
      } finally {
        resetImgPath();
      }
    };

    uploadImage();
  }, [imagePath]);

  return response;
};
