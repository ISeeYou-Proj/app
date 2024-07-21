import React, {useEffect, useRef, useState} from 'react';
import {Camera} from 'react-native-vision-camera';

interface Props {
  cameraRef: null | React.RefObject<Camera>;
  isCamPageActive: boolean;
  volumeBtnState: '' | 'UP' | 'DOWN';
  resetVolumeState: () => void;
}

/**
 * @description 볼륨 다운 버튼이 감지되면, 사진을 찍고 이 경로를 반환하는 커스텀 훅
 */
export const useTakePicture = ({
  cameraRef,
  isCamPageActive,
  volumeBtnState,
  resetVolumeState,
}: Props) => {
  const isTakePhoto = useRef<boolean>(false);
  const [imagePath, setImagePath] = useState('');

  const resetImgPath = () => {
    setImagePath('');
  };

  useEffect(() => {
    if (cameraRef?.current && volumeBtnState === 'DOWN' && isCamPageActive) {
      isTakePhoto.current = true;
      cameraRef.current
        .takePhoto({flash: 'auto'})
        .then(photo => {
          setImagePath(photo.path);
          console.log('photo path: ', photo.path);
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          resetVolumeState();
          isTakePhoto.current = false;
        });
    } else if (!isCamPageActive) {
      resetVolumeState();
    }
  }, [volumeBtnState]);

  return {imagePath, resetImgPath};
};
