import React, {useRef, useState} from 'react';
import {View} from 'react-native';
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
import {useCameraShot} from '../hooks/usecamerashot';
import LoadingSpinner from '../components/Loadingspinner';

export default function CameraPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isCamPageActive = useIsFocused();
  const camDevice = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const photoFormat = useCameraFormat(camDevice, [
    {photoResolution: {width: 720, height: 480}},
  ]);
  const camRef = useRef<Camera>(null);

  const {answer, reqBase64Img, resBase64Img, handleClickShutter} =
    useCameraShot(setIsLoading, camRef);

  if (!hasPermission) {
    return <PermissionComponent requestPermission={requestPermission} />;
  } else if (camDevice == undefined) {
    return <NocamComponent />;
  } else {
    return (
      <View className="flex-1 relative">
        <LoadingSpinner isLoading={isLoading} />
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
          <Shutter handleClickShutter={handleClickShutter} />
          {/* <Record
            prevAnswer={prevAnswer}
            setPrevAnswer={setPrevAnswer}
            prevBase64Img={prevBase64Img}
            width="20"
          /> */}
        </View>
      </View>
    );
  }
}
