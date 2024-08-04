import Sound from 'react-native-sound';
import {API_URL} from './apiurl';

/**
 * @description endpoint를 입력하면, 해당 백엔드 경로의 mp3 파일을 가져와서 실행하는 함수
 * @param endpoint mp3 파일이 존재하는 엔드포인트 문자열
 */
export const playMp3File = (endpoint: string) => {
  const ttsMp3 = new Sound(`${API_URL}${endpoint}`, undefined, error => {
    if (error) {
      console.log('Error loading sound: ' + error);
      return;
    }
    ttsMp3.play(success => {
      if (success) {
        console.log('성공적으로 재생되었습니다.');
        ttsMp3.release();
      } else {
        console.log('재생 중 오류가 발생했습니다.');
      }
    });
  });
};
