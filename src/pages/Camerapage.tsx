import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import PermissionComponent from '../components/Permissioncomp';
import NocamComponent from '../components/Nocamcomp';
import Shutter from '../components/Shutter';
import Record from '../components/Record';

export default function CameraPage(): React.JSX.Element {
  const isCamPageActive = useIsFocused();
  const camDevice = useCameraDevice('back');
  const photoFormat = useCameraFormat(camDevice, [
    {photoResolution: {width: 720, height: 480}},
  ]);
  const [prevAnswer, setPrevAnswer] = useState<string>('');
  const [prevBase64Img, setPrevBase64Img] = useState<string>('');

  useEffect(() => {
    console.log('prevAnswer: ', prevAnswer);
  }, [prevAnswer]);

  useEffect(() => {
    console.log('prevBase64Img: ', prevBase64Img.substring(0, 30) + '...');
  }, [prevBase64Img]);

  const camRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();

  if (!hasPermission) {
    return <PermissionComponent requestPermission={requestPermission} />;
  } else if (camDevice == undefined) {
    return <NocamComponent />;
  } else {
    return (
      <View className="w-full h-full relative">
        <Camera
          className="w-full h-full"
          device={camDevice}
          ref={camRef}
          photo={true}
          isActive={isCamPageActive}
          format={photoFormat}
        />
        <View className="w-full h=1/3 p-4 flex flex-row justify-between items-center absolute bottom-10">
          <View className="w-20 h-20" />
          <Shutter
            cameraRef={camRef}
            isActive={isCamPageActive}
            setPrevAnswer={setPrevAnswer}
            setPrevBase64Img={setPrevBase64Img}
          />
          <Record
            prevAnswer={prevAnswer}
            setPrevAnswer={setPrevAnswer}
            prevBase64Img={prevBase64Img}
            width="20"
          />
        </View>
      </View>
    );
  }
}
