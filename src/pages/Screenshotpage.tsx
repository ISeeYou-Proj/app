import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {useStt} from '../hooks/usestt';
import {useIsFocused} from '@react-navigation/native';
import {useVolumeUpDown} from '../hooks/usevolumeupdown';

export default function ScreenshotPage(): React.JSX.Element {
  const isWebviewActive = useIsFocused();
  const {volumeBtnState, resetVolumeState} = useVolumeUpDown({
    initialVolume: 0.5,
  });

  // 볼륨 업버튼 클릭 시 녹음 시작하고, 다시 클릭 시 녹음 종료하는 훅, 서버로 post 요청을 하고 결과도 반환
  const {recognizedText, aiSttResult, isRecording} = useStt({
    isActive: isWebviewActive,
    volumeBtnState: volumeBtnState,
    resetVolumeState: resetVolumeState,
  });

  return (
    <View className="w-full h-full">
      <WebView source={{uri: 'https://naver.com'}} />
      <View className="flex justify-center items-center">
        <Text className="text-xl">음성인식: {recognizedText}</Text>
        <Text className="text-xl">
          현재 음성인식중?: {isRecording.toString()}
        </Text>
      </View>
    </View>
  );
}
