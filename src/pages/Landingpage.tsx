import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, Text} from 'react-native';
import {NavParamType} from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<NavParamType, 'Landing'>;
};

export default function LandingPage({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Iseeyou',
            },
          ],
        }),
      );
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="w-full h-full flex justify-center items-center">
      <Text className="text-custom-black text-3xl mb-4">I See You</Text>
      <Text className="text-custom-black text-2xl">
        시각장애인도 편리하게 세상을 들을 수 있도록
      </Text>
    </SafeAreaView>
  );
}
