import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useTakePicture} from '../hooks/usetakepicture';
import {useVolumeUpDown} from '../hooks/usevolumeupdown';
import {useStt} from '../hooks/usestt';
import PermissionComponent from '../components/Permissioncomp';
import NocamComponent from '../components/Nocamcomp';
import {usePostImg} from '../hooks/usepostimg';

export default function CameraPage(): React.JSX.Element {
  const isCamPageActive = useIsFocused();
  const camDevice = useCameraDevice('back');
  const photoFormat = useCameraFormat(camDevice, [
    {videoResolution: 'max'},
    {photoResolution: 'max'},
  ]);

  const camRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();
  const {volumeBtnState, resetVolumeState} = useVolumeUpDown({
    initialVolume: 0.5,
  });

  // 볼륨 다운버튼 클릭 시 사진찍고 경로 반환하는 훅
  const {imagePath, resetImgPath} = useTakePicture({
    cameraRef: camRef,
    isCamPageActive: isCamPageActive,
    volumeBtnState: volumeBtnState,
    resetVolumeState: resetVolumeState,
  });

  const aiPhotoRes = usePostImg({imagePath, resetImgPath});

  // 볼륨 업버튼 클릭 시 녹음 시작하고, 다시 클릭 시 녹음 종료하는 훅
  const {recognizedText, aiSttResult, isRecording} = useStt({
    isCamPageActive: isCamPageActive,
    volumeBtnState: volumeBtnState,
    resetVolumeState: resetVolumeState,
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
          isActive={isCamPageActive}
          format={photoFormat}
        />
        <View className="w-full h-1/3 flex justify-center items-center">
          <Text className="text-custom-black text-xl">
            isRecording: {isRecording.toString()}
          </Text>
          <Text className="text-custom-black text-xl">
            res: {recognizedText}
          </Text>
          <Text className="text-custom-black text-xl">
            사진 경로: {imagePath}
          </Text>
          <Text className="text-custom-black text-xl">
            AI 사진 응답: {aiPhotoRes}
          </Text>
          <Text className="text-custom-black text-xl">
            AI stt 응답: {aiSttResult}
          </Text>
        </View>
      </View>
    );
  }
}
