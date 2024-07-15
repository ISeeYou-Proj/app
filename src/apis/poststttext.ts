import axios from 'axios';
import {API_URL} from '../utils/apiurl';

interface Props {
  recognizedText: string;
  setAiSttResult: React.Dispatch<React.SetStateAction<string>>;
}

export const postSttText = ({recognizedText, setAiSttResult}: Props) => {
  //   axios
  //     .post(API_URL, recognizedText)
  //     .then(res => setAiSttResult(res.data))
  //     .catch(e => console.error(e));

  setTimeout(() => {
    setAiSttResult('stt 응답 완료');
  }, 1000);
};
