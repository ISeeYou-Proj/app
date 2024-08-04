import {useCallback, useEffect, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import {getStorage} from '../utils/asyncstorage';
import axios from 'axios';
import {API_URL} from '../utils/apiurl';
import {playMp3File} from '../utils/playmp3file';

export const useCameraShot = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  cameraRef: React.RefObject<Camera>,
) => {
  const [answer, setAnswer] = useState<string>('');
  const [reqBase64Img, setReqBase64Img] = useState<string>('');
  const [resBase64Img, setResBase64Img] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');

  /**
   * @description imagePath 상태를 초기화하는 함수
   */
  const resetImgPath = () => {
    setImagePath('');
  };

  /**
   * @description 사진을 찍고 imagePath state를 업데이트하는 함수.
   * Shutter 컴포넌트에 props로 전달될 예정이므로 useCallback으로 감싸 불필요한 리렌더링 방지
   */
  const handleClickShutter = useCallback(() => {
    if (cameraRef?.current) {
      setIsLoading(true);
      cameraRef.current
        .takePhoto({flash: 'auto'})
        .then(photo => {
          setImagePath(photo.path);
          console.log('photo path: ', photo.path);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }, [cameraRef, setIsLoading]);

  useEffect(() => {
    const uploadImage = async () => {
      if (imagePath !== '') {
        try {
          const displayMode = await getStorage('displayMode');
          const ttsSpeed = await getStorage('ttsSpeed');
          const base64Img = await RNFS.readFile(imagePath, 'base64');
          setReqBase64Img(`data:image/png;base64,${base64Img}`);
          const postResponse = await axios.post(`${API_URL}/cameraimage`, {
            image: `data:image/png;base64,${base64Img}`,
            displayMode: displayMode,
            ttsSpeed: ttsSpeed,
          });
          const {msg, mp3, image}: {msg: string; mp3: string; image: string} =
            postResponse.data;
          setAnswer(msg);
          setResBase64Img(image);
          setIsLoading(false);
          playMp3File(mp3);
        } catch (e) {
          console.error('POST API에서 에러 발생', e);
        } finally {
          resetImgPath();
        }
      }
    };
    uploadImage();
  }, [imagePath]);

  return {answer, reqBase64Img, resBase64Img, handleClickShutter};
};
