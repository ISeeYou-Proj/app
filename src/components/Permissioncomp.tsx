import React from 'react';
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';

interface Props {
  requestPermission: () => Promise<boolean>;
}

export default function PermissionComponent({
  requestPermission,
}: Props): React.JSX.Element {
  return (
    <SafeAreaView className="w-full h-full flex justify-center items-center">
      <Text className="text-custom-black text-2xl mb-2">
        I See You 앱을 사용하기 위해서
      </Text>
      <Text className=" text-custom-black text-2xl">
        카메라 권한이 필요합니다
      </Text>
      <TouchableOpacity
        className="p-4 m-4 bg-blue-400 rounded-2xl"
        onPress={requestPermission}>
        <Text className="text-custom-white text-xl">권한 요청</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
