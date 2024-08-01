import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, Text} from 'react-native';
import {NavParamType} from '../../App';
import {getStorage, setStorage} from '../utils/asyncstorage';

type Props = {
  navigation: NativeStackNavigationProp<NavParamType, 'Landing'>;
};

export default function LandingPage({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      getStorage('hasUsed').then(value => {
        if (value === null) {
          console.log('처음 로그인한 유저입니다.');
          // 설정 기본값으로 세팅
          setStorage('displayMode', 'general');
          setStorage('ttsSpeed', '1.0');
          setStorage('imgApiEndpoint', '/webviewimage/lowvision');
          setStorage('hasUsed', 'yes');
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'Drawer',
              },
            ],
          }),
        );
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
