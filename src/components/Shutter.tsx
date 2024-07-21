import React from 'react';
import {VolumeManager} from 'react-native-volume-manager';
import {View, TouchableOpacity} from 'react-native';

export default function Shutter(): React.JSX.Element {
  const handleClickShutter = () => {
    VolumeManager.getVolume().then(volume => {
      console.log('currentVolume: ', volume.volume);
      VolumeManager.setVolume(volume.volume - 0.2);
    });
  };

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
