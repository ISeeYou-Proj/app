import React, {useEffect, useRef, useState} from 'react';
import {Camera} from 'react-native-vision-camera';
import {useVolumeUpDown} from './usevolumeupdown';

interface Props {
  cameraRef: null | React.RefObject<Camera>;
  isCamActive: boolean;
  initialVolume: number;
}

/**
 * @description 볼륨 다운 버튼이 감지되면, 사진을 찍고 이 경로를 반환하는 커스텀 훅
 */
export const useTakePicture = ({
  cameraRef,
  isCamActive,
  initialVolume,
}: Props) => {
  const isTakePhoto = useRef<boolean>(false);
  const [testImagePath, setTestImagePath] = useState('');
  const {volumeBtnState, resetVolumeState} = useVolumeUpDown({initialVolume});

  useEffect(() => {
    if (cameraRef?.current && volumeBtnState === 'DOWN' && isCamActive) {
      isTakePhoto.current = true;
      cameraRef.current
        .takePhoto({flash: 'auto'})
        .then(photo => {
          setTestImagePath(photo.path);
          console.log('photo path: ', photo.path);
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          resetVolumeState();
          isTakePhoto.current = false;
        });
    } else if (!isCamActive) {
      resetVolumeState();
    }
  }, [volumeBtnState]);

  return testImagePath;
};
