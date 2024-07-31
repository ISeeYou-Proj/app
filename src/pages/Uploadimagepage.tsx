import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
export default function UploadImagePage(): React.JSX.Element {
  const [imgBase64, setImgBase64] = useState('');

  const getImage = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 300,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.6,
      mediaType: 'photo',
    })
      .then(image => {
        console.log('selected image name: ', image.filename);
        setImgBase64(`data:${image.mime};base64,${image.data}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <Text className="text-xl text-custom-black">
        업로드 이미지 페이지 입니다.
      </Text>
      <Image
        source={{uri: imgBase64}}
        resizeMode="center"
        className="w-48 h-48"
      />
      <TouchableOpacity
        onPress={getImage}
        className="w-48 p-4 m-4 bg-custom-blue items-center rounded-2xl">
        <Text className="text-custom-white">이미지 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
}
