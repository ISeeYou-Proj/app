import React from 'react';
import {Text, SafeAreaView} from 'react-native';

export default function NocamComponent(): React.JSX.Element {
  return (
    <SafeAreaView className="w-full h-full flex justify-center items-center">
      <Text className="text-custom-black text-2xl mb-2">
        현재 장치에서 카메라가 감지되지 않았습니다.
      </Text>
      <Text className=" text-custom-black text-2xl mb-2">
        카메라가 없으면 앱을 사용할 수 없습니다.
      </Text>
      <Text className=" text-custom-black text-2xl">
        이용에 불편을 드려 죄송합니다.
      </Text>
    </SafeAreaView>
  );
}
