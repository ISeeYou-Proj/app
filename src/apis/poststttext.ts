import axios from 'axios';
import Sound from 'react-native-sound';
import {API_URL} from '../utils/apiurl';

interface Props {
  reqText: string;
  prevAnswer: string;
  prevBase64Img: string;
  setPrevAnswer: React.Dispatch<React.SetStateAction<string>>;
}

interface Response {
  data: {
    msg: string;
    mp3: string;
  };
}

export const postSttText = ({
  reqText,
  prevAnswer,
  prevBase64Img,
  setPrevAnswer,
}: Props) => {
  if (prevAnswer === '') {
    console.log(
      'prevAnswer가 비어있어 postSttText 함수를 early return 합니다.',
    );
    return;
  }

  axios
    .post(API_URL + '/voice', {
      voiceInput: {
        reqText: reqText,
        prevText: prevAnswer,
      },
      imageInput: {
        image: prevBase64Img,
      },
    })
    .then((res: Response) => {
      const {msg, mp3} = res.data;
      console.log('msg: ', msg, ' mp3: ', mp3);
      setPrevAnswer(msg);

      const ttsMp3 = new Sound(`${API_URL}${mp3}`, undefined, error => {
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
    })
    .catch(error => console.error(error));
};
