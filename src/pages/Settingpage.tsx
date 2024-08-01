import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View, Image} from 'react-native';
import RadioButtonGroup from '../components/common/radiobutton/Radiobuttongroup';
import DropDownPicker from 'react-native-dropdown-picker';
import {getStorage, setStorage} from '../utils/asyncstorage';

export default function SettingPage(): React.JSX.Element {
  const [asyncDisplayMode, setAsyncDisplayMode] = useState<string>('');
  const [asyncTtsSpeed, setAsyncTTsSpeed] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<string>('');
  const [ttsSpeed, setTtsSpeed] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [dropdownValue, setDropdownValue] = useState([
    {label: 'x1.0', value: '1.0'},
    {label: 'x1.25', value: '1.25'},
    {label: 'x1.5', value: '1.5'},
    {label: 'x1.75', value: '1.75'},
    {label: 'x2.0', value: '2.0'},
  ]);

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
    console.log(ttsSpeed, asyncTtsSpeed, displayMode, asyncDisplayMode);
  }, []);

  useEffect(() => {
    getStorage('ttsSpeed').then(value => {
      if (ttsSpeed !== '' && value !== ttsSpeed) {
        setStorage('ttsSpeed', ttsSpeed)
          .then(() => {
            console.log('ttsSpeed 저장 완료');
          })
          .catch(error => {
            console.log('ttsSpeed 저장 도중 에러 발생', error);
          });
      } else {
        console.log('ttsSpeed 저장할 필요 X');
      }
      getStorage('displayMode').then(value => {
        if (displayMode !== '' && value !== displayMode) {
          setStorage('displayMode', displayMode)
            .then(() => {
              console.log('displayMode 저장 완료');
            })
            .catch(error => {
              console.log('displayMode 저장 도중 에러 발생', error);
            });
        }
      });
    });
  }, [ttsSpeed, displayMode]);

  return loading ? (
    <View />
  ) : (
    <View className="w-full h-full mt-0 flex justify-center items-center">
      <View className="w-full h-full">
        <View className="mb-8">
          <View
            className="w-full items-center flex-row p-4 bg-custom-grey"
            accessible={true}>
            <Image
              className={'w-6 h-6 mr-4'}
              source={require('../assets/displaymode.png')}
              resizeMode="cover"
            />
            <Text className="text-lg text-custom-black" accessible={true}>
              화면 모드 설정
            </Text>
          </View>
          <View className="px-6">
            <RadioButtonGroup
              selected={displayMode}
              onSelected={value => {
                setDisplayMode(value);
              }}>
              <RadioButtonGroup.RadioButtonItem
                value="general"
                accessibilityRole="radio"
                accessibilityState={{checked: displayMode === 'general'}}
                accessibilityLabel="끄기">
                <Text className="text-custom-black">끄기</Text>
              </RadioButtonGroup.RadioButtonItem>
              <View className=" mt-3 border-t border-custom-grey" />
              <RadioButtonGroup.RadioButtonItem
                value="lowVision"
                accessibilityRole="radio"
                accessibilityState={{checked: displayMode === 'lowVision'}}
                accessibilityLabel="시력 저하 모드">
                <Text className="text-custom-black">시력 저하 모드</Text>
              </RadioButtonGroup.RadioButtonItem>
              <View className=" mt-3 border-t border-custom-grey" />
              <RadioButtonGroup.RadioButtonItem
                value="totallyBlind"
                accessibilityRole="radio"
                accessibilityState={{checked: displayMode === 'totallyBlind'}}
                accessibilityLabel="전맹 모드">
                <Text className="text-custom-black">전맹 모드</Text>
              </RadioButtonGroup.RadioButtonItem>
              <View className=" mt-3 border-t border-custom-grey" />
              <RadioButtonGroup.RadioButtonItem
                value="redGreenColorBlind"
                accessibilityRole="radio"
                accessibilityState={{
                  checked: displayMode === 'redGreenColorBlind',
                }}
                accessibilityLabel="적록색맹 모드">
                <Text className="text-custom-black">적록색맹 모드</Text>
              </RadioButtonGroup.RadioButtonItem>
              <View className=" mt-3 border-t border-custom-grey" />
              <RadioButtonGroup.RadioButtonItem
                value="totallyColorBlind"
                accessibilityRole="radio"
                accessibilityState={{
                  checked: displayMode === 'totallyColorBlind',
                }}
                accessibilityLabel="전색맹 모드">
                <Text className="text-custom-black">전색맹 모드</Text>
              </RadioButtonGroup.RadioButtonItem>
            </RadioButtonGroup>
          </View>
        </View>
        <View>
          <View
            className="w-full flex-row justify-start items-center p-4 bg-custom-grey"
            accessible={true}>
            <Image
              className={'w-6 h-6 mr-4'}
              source={require('../assets/ttsspeed.png')}
              resizeMode="cover"
            />
            <Text className="text-lg text-custom-black" accessible={true}>
              안내 음성 속도
            </Text>
          </View>
          <View className="px-6 mt-3">
            <DropDownPicker
              open={openDropdown}
              setOpen={setOpenDropdown}
              items={dropdownValue}
              value={ttsSpeed}
              setValue={setTtsSpeed}
              setItems={setDropdownValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
