import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import {useRecord} from '../hooks/userecord';

export default function CameraPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const isCamPageActive = useIsFocused();
  const camDevice = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const photoFormat = useCameraFormat(camDevice, [
    {photoResolution: {width: 720, height: 480}},
  ]);
  const camRef = useRef<Camera>(null);

  // 사진 촬영 커스텀 훅
  const {
    answer,
    setAnswer,
    reqBase64Img,
    resBase64Img,
    handleClickShutter,
    resetCamState,
  } = useCameraShot(setIsLoading, camRef);

  // 음성 인식 커스텀 훅
  const {recognizedTxt, recordFlag, toggleRecordFlag, resetSttState} =
    useRecord(answer, setAnswer, reqBase64Img, isLoading, setIsLoading);

  // Focus가 blur 되면 state를 리셋
  useEffect(
    () =>
      navigation.addListener('blur', () => {
        resetCamState();
        resetSttState();
      }),
    [],
  );

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
        <View className="w-full flex items-center absolute bottom-40">
          <Text className="text-custom-black text-2xl mb-2">
            음성인식: {recognizedTxt}, 현재녹음중?: {JSON.stringify(recordFlag)}
          </Text>
        </View>
        <View className="w-full h=1/3 p-4 flex flex-row justify-between items-center absolute bottom-10">
          <View className="w-20 h-20" />
          <Shutter handleClickShutter={handleClickShutter} />
          <Record recordFlag={recordFlag} toggleRecordFlag={toggleRecordFlag} />
        </View>
      </View>
    );
  }
}
