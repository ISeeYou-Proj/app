import {useCallback, useState} from 'react';

export const useModalState = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const toggleModalState = useCallback(() => {
    setIsModalVisible(prev => !prev);
  }, [setIsModalVisible]);

  return {isModalVisible, toggleModalState};
};
