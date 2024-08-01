import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TutorialType} from '../../../App';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import RadioButtonGroup from '../../components/common/radiobutton/Radiobuttongroup';
import {setStorage} from '../../utils/asyncstorage';

type Props = {
  navigation: NativeStackNavigationProp<TutorialType, 'EyeSetting'>;
};

export default function EyeSetting({navigation}: Props): React.JSX.Element {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('selected: ', selected);
  }, [selected]);

  const saveEyeStatus = () => {
    setStorage('eyeStatus', selected).then(() => {
      console.log('async storage에 eyeStatus 저장 완료');
      navigation.push('Page2');
    });
  };

  return (
    <SafeAreaView className="w-full h-full flex justify-center items-center">
      <View>
        <Text className="text-2xl text-custom-black">I See You!</Text>
        <Text className="text-lg text-custom-black">
          어떤 불편함이 있으신가요?
        </Text>
        <RadioButtonGroup
          selected={selected}
          onSelected={value => {
            setSelected(value);
          }}>
          <RadioButtonGroup.RadioButtonItem value="lowVision">
            <Text className="text-custom-black">저시력 시각장애</Text>
          </RadioButtonGroup.RadioButtonItem>
          <RadioButtonGroup.RadioButtonItem value="totallyBlind">
            <Text className="text-custom-black">전맹 시각장애</Text>
          </RadioButtonGroup.RadioButtonItem>
        </RadioButtonGroup>
      </View>

      {selected !== '' ? (
        <TouchableOpacity
          className="absolute bottom-10 right-10 mt-4 p-4 bg-custom-blue rounded-2xl"
          onPress={saveEyeStatus}>
          <Text className="text-custom-white">다음으로 이동</Text>
        </TouchableOpacity>
      ) : (
        <View className="absolute bottom-10 right-10 mt-4 p-4" />
      )}
    </SafeAreaView>
  );
}
