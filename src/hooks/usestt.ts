import {useEffect, useState} from 'react';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {postSttText} from '../apis/poststttext';

interface Props {
  isActive: boolean;
  volumeBtnState: '' | 'UP' | 'DOWN';
  resetVolumeState: () => void;
}

export const useStt = ({isActive, volumeBtnState, resetVolumeState}: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [aiSttResult, setAiSttResult] = useState<string>('');

  useEffect(() => {
    const onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        setRecognizedText(e.value[0]);
      }
    };
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (volumeBtnState === 'UP' && isActive) {
      if (isRecording) {
        Voice.stop()
          .then(() => {
            setIsRecording(false);
            postSttText({recognizedText, setAiSttResult});
          })
          .catch(e => {
            console.error('음성인식 종료에 문제 발생: ', e);
          })
          .finally(() => {
            resetVolumeState();
          });
      } else {
        setRecognizedText('');
        Voice.start('ko-KR')
          .then(() => {
            setIsRecording(true);
          })
          .catch(e => {
            console.error('음성인식 시작에 문제 발생: ', e);
          })
          .finally(() => {
            resetVolumeState();
          });
      }
    } else if (!isActive && isRecording) {
      Voice.destroy()
        .then(() => {
          setIsRecording(false);
          setRecognizedText('');
        })
        .catch(e => {
          console.error('음성인식 종료에 문제 발생: ', e);
        })
        .finally(() => {
          resetVolumeState();
        });
    }
  }, [volumeBtnState, isActive]);

  return {recognizedText, aiSttResult, isRecording};
};
