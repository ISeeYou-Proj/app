import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

export default function ScreenshotPage(): React.JSX.Element {
  return (
    <View className="w-full h-full">
      <WebView className="w-full h-full" source={{uri: 'https://naver.com'}} />
    </View>
  );
}
