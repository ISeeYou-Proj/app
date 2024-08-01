import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import RadioButtonGroup from '../components/common/radiobutton/Radiobuttongroup';
import {getStorage, setStorage} from '../utils/asyncstorage';

export default function SettingPage(): React.JSX.Element {
  const [asyncDisplayMode, setAsyncDisplayMode] = useState<string>('');
  const [asyncTtsSpeed, setAsyncTTsSpeed] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<string>('');
  const [ttsSpeed, setTtsSpeed] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);

  /**
   * @description 변경된 설정을 async storage에 업데이트
   */
  const saveNewSetting = () => {
    setStorage('displayMode', displayMode)
      .then(() => {
        console.log('displayMode 업데이트 완료');
      })
      .catch(e => [console.log('displayMode 업데이트 도중 에러 발생', e)]);
    setStorage('ttsSpeed', ttsSpeed)
      .then(() => {
        console.log('ttsSpeed 업데이트 완료');
      })
      .catch(e => [console.log('ttsSpeed 업데이트 도중 에러 발생', e)]);
    Alert.alert('저장 완료', '설정이 성공적으로 저장되었어요!');
  };

  useEffect(() => {
    getStorage('displayMode').then(value => {
      if (value !== null) {
        console.log('displayMode get 완료');
        setDisplayMode(value);
        setAsyncDisplayMode(value);
      }
    });
    getStorage('ttsSpeed').then(value => {
      if (value !== null) {
        console.log('ttsSpeed get 완료');
        setTtsSpeed(value);
        setAsyncTTsSpeed(value);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setIsBtnDisable(
      ttsSpeed === asyncTtsSpeed && displayMode === asyncDisplayMode,
    );
  }, [ttsSpeed, displayMode]);

  return loading ? (
    <View />
  ) : (
    <View className="w-full h-full flex justify-center items-center p-8">
      <View className="w-full h-full">
        <View className="mb-8">
          <Text className="text-lg text-custom-black">화면 모드 설정</Text>
          <RadioButtonGroup
            selected={displayMode}
            onSelected={value => {
              setDisplayMode(value);
            }}>
            <RadioButtonGroup.RadioButtonItem value="general">
              <Text className="text-custom-black">
                시각장애를 앓고 있지 않음
              </Text>
            </RadioButtonGroup.RadioButtonItem>
            <RadioButtonGroup.RadioButtonItem value="lowVision">
              <Text className="text-custom-black">저시력 시각장애</Text>
            </RadioButtonGroup.RadioButtonItem>
            <RadioButtonGroup.RadioButtonItem value="totallyBlind">
              <Text className="text-custom-black">전맹 시각장애</Text>
            </RadioButtonGroup.RadioButtonItem>
          </RadioButtonGroup>
        </View>
        <View>
          <Text className="text-lg text-custom-black">안내 음성 속도</Text>
          {/* 드롭다운 컴포넌트 라이브러리 설치하고 여기에 추가 */}
        </View>
      </View>
      {isBtnDisable ? (
        <View />
      ) : (
        <TouchableOpacity
          className="absolute bottom-20 bg-custom-skyblue p-4 rounded-2xl"
          onPress={saveNewSetting}>
          <Text className="text-lg text-custom-black">저장하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
