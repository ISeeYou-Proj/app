import React, {useRef} from 'react';
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

  const camRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();

  // 볼륨 업버튼 클릭 시 녹음 시작하고, 다시 클릭 시 녹음 종료하는 훅, 서버로 post 요청을 하고 결과도 반환
  // const {recognizedText, isRecording} = useStt({
  //   isActive: isCamPageActive,
  //   prevAnswer: aiPhotoRes,
  //   prevBase64Img: prevBase64Img,
  //   setPrevAnswer: setAiPhotoRes,
  //   volumeBtnState: volumeBtnState,
  //   resetVolumeState: resetVolumeState,
  // });

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
          <Shutter cameraRef={camRef} isCamPageActive={isCamPageActive} />
          <Record />
        </View>
      </View>
    );
  }
}
