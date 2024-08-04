import React from 'react';
import {View, ActivityIndicator} from 'react-native';

interface Props {
  isLoading: boolean;
}

export default React.memo(function LoadingSpinner({isLoading}: Props) {
  console.log('LoadingSpinner isLoading: ', isLoading);
  if (isLoading) {
    return (
      <View className="w-full h-full absolute inset-0 flex justify-center items-center brightness-50 z-50">
        <ActivityIndicator size="large" color="#40A3FF" className="scale-150" />
      </View>
    );
  } else {
    return null;
  }
});
