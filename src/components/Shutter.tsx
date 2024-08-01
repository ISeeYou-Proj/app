import React, {useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {useCameraPostImg} from '../hooks/usecamerapostimg';

interface Props {
  cameraRef: null | React.RefObject<Camera>;
  isCamPageActive: boolean;
  // handleClickShutter: () => {};
}

export default function Shutter({
  cameraRef,
  isCamPageActive,
}: Props): React.JSX.Element {
  const isTakePhoto = useRef<boolean>(false);
  const [imagePath, setImagePath] = useState<string>('');

  const resetImgPath = () => {
    setImagePath('');
  };

  /**
   * @description 사진촬영 버튼을 누르면, 사진을 찍고 imagePath를 업데이트하는 함수
   */
  const handleClickShutter = () => {
    if (cameraRef?.current && isCamPageActive) {
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
          isTakePhoto.current = false;
        });
    }
  };

  const {response, setResponse, prevBase64Img} = useCameraPostImg({
    imagePath,
    resetImgPath,
  });

  return (
    <View className="w-20 h-20 relative">
      <View className="w-full h-full rounded-full border border-custom-white absolute bottom-0.5 left-0.5 flex justify-center items-center">
        <TouchableOpacity
          className="w-5/6 h-5/6 rounded-full bg-custom-white"
          onPress={handleClickShutter}
          accessible={true}
          accessibilityLabel="사진 촬영 버튼"
        />
      </View>
    </View>
  );
}
