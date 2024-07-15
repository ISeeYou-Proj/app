import React, {useState} from 'react';
import {VolumeManager} from 'react-native-volume-manager';
import {View, TouchableOpacity} from 'react-native';

export default function Record(): React.JSX.Element {
  const [recordFlag, setRecordFlag] = useState<boolean>(false);

  const viewStyle = recordFlag ? 'bg-red-500' : '';
  const accessibility = recordFlag ? '녹음 종료 버튼' : '녹음 시작 버튼';

  const handleClickShutter = () => {
    setRecordFlag(prev => !prev);
    VolumeManager.getVolume().then(volume => {
      console.log('currentVolume: ', volume.volume);
      VolumeManager.setVolume(volume.volume + 0.2);
    });
  };
  return (
    <View className="w-20 h-20 relative flex justify-center items-center">
      <View className="w-full h-full rounded-full absolute bottom-0.5 left-0.5 flex justify-center items-center">
        <TouchableOpacity
          className="w-5/6 h-5/6 rounded-full bg-custom-white flex justify-center items-center"
          onPress={handleClickShutter}
          accessible={true}
          accessibilityLabel={accessibility}>
          <View
            className={`w-1/3 h-1/3 rounded-full border-2 border-red-500 ${viewStyle}`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
