import React, {useEffect, useRef} from 'react';
import {Image, View} from 'react-native';
import {NavParamType} from '../../App';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useTakePicture} from '../hooks/usetakepicture';
import PermissionComponent from '../components/Permissioncomp';
import NocamComponent from '../components/Nocamcomp';

type Props = {
  navigation: NativeStackNavigationProp<NavParamType, 'Iseeyou'>;
};

export default function CameraPage({navigation}: Props): React.JSX.Element {
  const isCamActive = useIsFocused();
  console.log('isCamActive: ', isCamActive);
  const camDevice = useCameraDevice('back');
  const photoFormat = useCameraFormat(camDevice, [
    {videoResolution: 'max'},
    {photoResolution: 'max'},
  ]);

  const camRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();

  const testImagePath = useTakePicture({
    cameraRef: camRef,
    isCamActive: isCamActive,
    initialVolume: 0.5,
  });

  if (!hasPermission) {
    return <PermissionComponent requestPermission={requestPermission} />;
  } else if (camDevice == undefined) {
    return <NocamComponent />;
  } else {
    return (
      <View className="w-full h-full ">
        <Camera
          className="w-full h-2/3"
          device={camDevice}
          ref={camRef}
          photo={true}
          isActive={isCamActive}
          format={photoFormat}
        />
        <Image src={testImagePath} className="w-full h-1/3" />
      </View>
    );
  }
}
