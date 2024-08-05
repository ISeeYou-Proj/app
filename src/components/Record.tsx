import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

interface Props {
  recordFlag: boolean | null;
  toggleRecordFlag: () => void;
}

export default function Record({
  recordFlag,
  toggleRecordFlag,
}: Props): React.JSX.Element {
  const accessibility = recordFlag ? '녹음 종료 버튼' : '녹음 시작 버튼';

  return (
    <View className="w-20 h-20 relative flex justify-center items-center">
      <View className="w-full h-full rounded-full absolute bottom-0.5 left-0.5 flex justify-center items-center">
        <TouchableOpacity
          className="w-5/6 h-5/6 flex justify-center items-center"
          onPress={toggleRecordFlag}
          accessible={true}
          accessibilityLabel={accessibility}>
          {recordFlag ? (
            <Image
              className="w-12 h-12 p-2"
              source={require('../assets/mic_off.png')}
              resizeMode="center"
            />
          ) : (
            <Image
              className="w-12 h-12 p-2"
              source={require('../assets/mic.png')}
              resizeMode="center"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
