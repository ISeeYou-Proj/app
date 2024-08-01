import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, Text} from 'react-native';
import {NavParamType} from '../../App';
import {getStorage} from '../utils/asyncstorage';

type Props = {
  navigation: NativeStackNavigationProp<NavParamType, 'Landing'>;
};

export default function LandingPage({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      getStorage('hasUsed').then(value => {
        if (value === null) {
          console.log('처음 로그인한 유저입니다.');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Tutorial',
                },
              ],
            }),
          );
          // 처음 로그인한 유저를 위한 로직
        } else {
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
        }
      });
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
