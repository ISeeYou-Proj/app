import {useEffect} from 'react';
import {useStt} from './usestt';
import {getStorage} from '../utils/asyncstorage';
import axios from 'axios';
import {API_URL} from '../utils/apiurl';
import {playMp3File} from '../utils/playmp3file';

export const useRecord = (
  answer: string,
  setAnswer: React.Dispatch<React.SetStateAction<string>>,
  reqBase64Img: string,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // 음성 인식 결과 state와, 녹음 상태 setState 함수 반환하는 커스텀 훅
  const {recognizedTxt, recordFlag, toggleRecordFlag, resetSttState} =
    useStt(setIsLoading);

  useEffect(() => {
    const uploadVoice = async () => {
      try {
        if (recognizedTxt !== '' && !recordFlag && isLoading) {
          console.log('uploadVoice 함수 시작');
          const displayMode = await getStorage('displayMode');
          const ttsSpeed = await getStorage('ttsSpeed');
          const response = await axios.post(`${API_URL}/voice`, {
            reqText: recognizedTxt,
            prevText: answer,
            prevImage: reqBase64Img,
            displayMode: displayMode,
            ttsSpeed: ttsSpeed,
          });
          // todo: setTimeout은 제거할 예정
          setTimeout(() => {
            const {msg, mp3} = response.data;
            setAnswer(msg);
            setIsLoading(false);
            playMp3File(mp3);
          }, 2000);
        }
      } catch (e) {
        console.log('uploadVoice 함수 에러 발생', e);
      }
    };
    uploadVoice();
  }, [recognizedTxt, recordFlag, isLoading]);

  return {recognizedTxt, recordFlag, toggleRecordFlag, resetSttState};
};
