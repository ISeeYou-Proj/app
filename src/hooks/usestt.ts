import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import React, {useCallback, useEffect, useState} from 'react';

export const useStt = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [recordFlag, setRecordFlag] = useState<boolean | null>(null);
  const [recognizedTxt, setRecognizedTxt] = useState<string>('');

  /**
   * @description Focus가 blur 되면 실행할 리셋함수
   */
  const resetSttState = () => {
    console.log('resetSttState 함수 시작');
    setRecognizedTxt('');
    setRecordFlag(null);
  };

  /**
   * @description recordFlag state를 true <--> false 바꿔주는 함수
   */
  const toggleRecordFlag = useCallback(() => {
    if (recordFlag === null || !recordFlag) {
      setRecordFlag(true);
    } else if (recordFlag) {
      setRecordFlag(false);
    }
  }, [recordFlag]);

  useEffect(() => {
    console.log('음성 인식 모듈 마운트');
    const onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        setRecognizedTxt(e.value[0]);
      }
    };
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      console.log('음성 인식 모듈 언마운트');
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    const handleStt = async () => {
      if (recordFlag === null) {
        return;
      } else if (recordFlag) {
        setRecognizedTxt('');
        try {
          await Voice.start('ko-KR');
          console.log('녹음 시작');
        } catch (e) {
          console.log('handleStt 에러 발생: ', e);
        }
      } else if (!recordFlag && recognizedTxt !== '') {
        try {
          await Voice.stop();
          console.log('녹음 종료');
          setIsLoading(true);
        } catch (e) {
          console.log('녹음 종료 도중 문제 발생', e);
        }
      }
    };
    handleStt();
  }, [recordFlag]);

  return {recognizedTxt, recordFlag, toggleRecordFlag, resetSttState};
};
