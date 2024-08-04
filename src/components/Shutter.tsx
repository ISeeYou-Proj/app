import React from 'react';
import {View, TouchableOpacity} from 'react-native';

interface Props {
  handleClickShutter: () => void;
}
export default function Shutter({
  handleClickShutter,
}: Props): React.JSX.Element {
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
