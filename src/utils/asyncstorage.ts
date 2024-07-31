import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description key와 value를 입력하면 Async storage에 저장하는 함수
 */
export const setStorage = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('저장 완료');
  } catch (e) {
    console.error('setStorageError: ', e);
  }
};

/**
 * @description key를 입력하면 Async storage에서 value를 가져오는 함수
 */
export const getStorage = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('불러오기 완료');
    return value;
  } catch (e) {
    console.error('getStorageError: ', e);
    return null;
  }
};

/**
 * @description key를 입력하면 Async storage에서 해당 key에 맞는 데이터를 찾아 삭제하는 함수
 */
export const removeStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('삭제 완료');
  } catch (e) {
    console.error('removeStorageError: ', e);
  }
};
