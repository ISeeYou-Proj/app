import React, {useContext} from 'react';
import {View, StyleSheet, Pressable, ViewStyle} from 'react-native';
import {RadioGroupContext} from './Radiobuttongroup';

interface props {
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

const RadioButtonItem = (props: props) => {
  const {value, children, disabled, containerStyle} = props;
  const {onSelected, selected} = useContext(RadioGroupContext);

  const isSelected = () => {
    return selected === value;
  };

  const triggerRadioButton = () => {
    if (onSelected && !disabled) {
      onSelected(value);
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (onSelected && !disabled) {
          onSelected(value);
        }
      }}
      style={[styles.radioButtonItemContainer, containerStyle]}>
      <View
        className={
          isSelected()
            ? 'border-custom-black border'
            : 'border-custom-black border' + disabled
            ? 'bg-gray-300 border border-gray-600'
            : ''
        }
        style={[styles.radioButtonCircle]}>
        {isSelected() && (
          <View
            className={disabled ? 'bg-gray-300' : 'bg-custom-blue'}
            style={{
              width: 15,
              height: 15,
              borderRadius: 50,
            }}
          />
        )}
      </View>
      {children && (
        <Pressable style={styles.label} onPress={triggerRadioButton}>
          {children}
        </Pressable>
      )}
    </Pressable>
  );
};

export default RadioButtonItem;

const styles = StyleSheet.create({
  radioButtonItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioButtonCircle: {
    borderWidth: 1,
    padding: 2,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 8,
  },
});
