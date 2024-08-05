import React from 'react';
import {View, ActivityIndicator} from 'react-native';

interface Props {
  isLoading: boolean;
}

export default React.memo(function LoadingSpinner({isLoading}: Props) {
  console.log('LoadingSpinner isLoading: ', isLoading);
  if (isLoading) {
    return (
      <View className="w-full h-full absolute flex justify-center items-center brightness-90 z-50">
        <ActivityIndicator size="large" color="#2595ff" className="scale-150" />
      </View>
    );
  } else {
    return null;
  }
});
