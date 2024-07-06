import {useEffect, useRef, useState} from 'react';
import {setVolume, VolumeManager} from 'react-native-volume-manager';

interface Props {
  initialVolume: number;
}

/**
 * @description 사용자가 볼륨 업 버튼을 누르면 UP, 다운 버튼을 누르면 DOWN 상태를
 * 가지는 상태와, 상태를 리셋해 빈 문자열로 만드는 함수를 반환하는 커스텀 훅
 */
export const useVolumeUpDown = ({initialVolume}: Props) => {
  const [volumeBtnState, setVolumeBtnState] = useState<'UP' | 'DOWN' | ''>('');
  const isVolumeSetting = useRef(false);

  const resetVolumeState = () => {
    setVolumeBtnState('');
  };

  useEffect(() => {
    console.log('volumeBtnState: ', volumeBtnState);
  }, [volumeBtnState]);

  useEffect(() => {
    const volumeBtnListener = VolumeManager.addVolumeListener(newVolume => {
      if (isVolumeSetting.current) {
        return;
      }
      if (newVolume.volume > initialVolume) {
        setVolumeBtnState('UP');
        isVolumeSetting.current = true;
        setVolume(initialVolume).then(() => {
          setTimeout(() => {
            isVolumeSetting.current = false;
          }, 1000); // 1초 후 리스너 활성화
        });
      } else if (newVolume.volume < initialVolume) {
        setVolumeBtnState('DOWN');
        isVolumeSetting.current = true;
        setVolume(initialVolume).then(() => {
          setTimeout(() => {
            isVolumeSetting.current = false;
          }, 1000); // 1초 후 리스너 활성화
        });
      }
    });

    return () => {
      volumeBtnListener.remove();
    };
  }, []);

  return {volumeBtnState, resetVolumeState};
};
