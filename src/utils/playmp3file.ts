import Sound from 'react-native-sound';
import {API_URL} from './apiurl';

// 전역 변수로 Sound 인스턴스를 배치해서 중복된 인스턴스 생성이 되지 않도록 하기
let ttsMp3: null | Sound = null;

/**
 * @description endpoint를 입력하면, 해당 백엔드 경로의 mp3 파일을 가져와서 실행하는 함수
 * @param endpoint mp3 파일이 존재하는 엔드포인트 문자열
 */
export const playMp3File = (endpoint: string) => {
  if (ttsMp3 !== null) {
    ttsMp3.stop(() => {
      ttsMp3?.release();
    });
    ttsMp3 = null;
  }
  ttsMp3 = new Sound(`${API_URL}${endpoint}`, undefined, error => {
    if (error) {
      console.log('Error loading sound: ' + error);
      return;
    }
    if (ttsMp3 !== null) {
      ttsMp3.play(success => {
        if (success) {
          console.log('성공적으로 재생되었습니다.');
        } else {
          console.log('재생 중 오류가 발생했습니다.');
        }
        ttsMp3?.release();
        ttsMp3 = null;
      });
    }
  });
};
