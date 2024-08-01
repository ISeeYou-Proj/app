import {View, ViewStyle} from 'react-native';
import React, {createContext} from 'react';
import RadioButtonItem from './Radiobuttonitem';

interface Props {
  selected?: string;
  children: React.ReactNode;
  onSelected?: (selected: string) => void;
  tailwindStyle?: string;
}

type ContextProps = Omit<Props, 'children' | 'containerStyle'>;
export const RadioGroupContext = createContext<ContextProps>({});

const RadioButtonGroup = (props: Props) => {
  const {Provider} = RadioGroupContext;

  const {selected, children, onSelected, tailwindStyle} = props;

  return (
    <Provider
      value={{
        onSelected,
        selected,
      }}>
      <View className={tailwindStyle}>{children}</View>
    </Provider>
  );
};

RadioButtonGroup.RadioButtonItem = RadioButtonItem;

export default RadioButtonGroup;
