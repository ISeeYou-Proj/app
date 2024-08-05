import React, {useEffect, useState} from 'react';
import {Modal, Image, View, Text, TouchableOpacity} from 'react-native';
import Loadingspinner from './Loadingspinner';
import {getStorage} from '../utils/asyncstorage';
import Record from './Record';

interface ModalProps {
  isModalVisible: boolean;
  isLoading: boolean;
  isRecordLoading: boolean;
  recordFlag: boolean | null;
  reqBase64Img: string;
  resBase64Img: string;
  answer: string;
  toggleModalState: () => void;
  toggleRecordFlag: () => void;
}

interface RenderProps {
  base64Img: string;
  answer: string;
  recordFlag: boolean | null;
  isRecordLoading: boolean;
  toggleModalState: () => void;
  toggleRecordFlag: () => void;
}

function RenderModal({
  base64Img,
  answer,
  recordFlag,
  isRecordLoading,
  toggleModalState,
  toggleRecordFlag,
}: RenderProps): React.JSX.Element {
  return (
    <View className="w-full h-2/3 flex relative items-center mt-52 bg-white">
      <View className="w-full h-4/5 absolute top-0 overflow-hidden">
        <Image
          className="flex-1 rotate-90"
          source={{uri: base64Img}}
          resizeMode="center"
        />
        {!isRecordLoading && (
          <TouchableOpacity
            onPress={toggleModalState}
            className="absolute top-0 right-0 p-2"
            accessible={true}
            accessibilityLabel="팝업 닫기 버튼">
            <Image
              className="w-12 h-12 p-2"
              source={require('../assets/exit.png')}
              resizeMode="center"
            />
          </TouchableOpacity>
        )}
      </View>

      <Loadingspinner isLoading={isRecordLoading} />
      {!isRecordLoading && (
        <View className="w-full h-1/5 absolute bottom-0">
          <Text className="text-lg mx-6 text-black text-center line-clamp-1">
            {answer}
          </Text>
          <View className="flex flex-row justify-center items-center mb-12">
            <Record
              recordFlag={recordFlag}
              toggleRecordFlag={toggleRecordFlag}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default function ResultModal({
  isModalVisible,
  isLoading,
  isRecordLoading,
  recordFlag,
  reqBase64Img,
  resBase64Img,
  answer,
  toggleModalState,
  toggleRecordFlag,
}: ModalProps): React.JSX.Element {
  const [displayMode, setDisplayMode] = useState<string>('');

  useEffect(() => {
    getStorage('displayMode').then(value => {
      if (value !== null) {
        setDisplayMode(value);
      }
    });
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={toggleModalState}
      transparent={true}>
      <Loadingspinner isLoading={isLoading} />
      {!isLoading &&
        (displayMode === 'general' ? (
          <RenderModal
            base64Img={reqBase64Img}
            answer={answer}
            recordFlag={recordFlag}
            isRecordLoading={isRecordLoading}
            toggleModalState={toggleModalState}
            toggleRecordFlag={toggleRecordFlag}
          />
        ) : displayMode !== 'general' && displayMode !== 'totallyBlind' ? (
          <RenderModal
            base64Img={resBase64Img}
            answer={answer}
            recordFlag={recordFlag}
            isRecordLoading={isRecordLoading}
            toggleModalState={toggleModalState}
            toggleRecordFlag={toggleRecordFlag}
          />
        ) : null)}
    </Modal>
  );
}
