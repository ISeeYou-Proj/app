import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCameraFormat,
} from 'react-native-vision-camera';

import {setVolume, VolumeManager} from 'react-native-volume-manager';

interface PermissionsPageProps {
  requestPermission: () => Promise<boolean>;
}

function PermissionsPage({
  requestPermission,
}: PermissionsPageProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.permissionText}>카메라 권한이 필요합니다</Text>
      <TouchableOpacity style={styles.button} onPress={requestPermission}>
        <Text style={styles.buttonText}>권한 요청</Text>
      </TouchableOpacity>
    </View>
  );
}

function NoCameraDeviceError(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>카메라를 사용할 수 없습니다</Text>
    </View>
  );
}

export default function App(): React.JSX.Element {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isTakePhoto = useRef<boolean>(false);
  const format = useCameraFormat(device, [
    {videoResolution: 'max'},
    {photoResolution: 'max'},
  ]);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [testImagePath, setTestImagePath] = useState<string>(
    'file:///private/var/mobile/Containers/Data/Application/C4646677-AB00-462F-96A2-E5C9D84909C0/tmp/5ACCAE2F-C84A-41B9-9D09-BCA51E76D2FA.jpeg',
  );
  useEffect(() => {
    const volumeBtnListener = VolumeManager.addVolumeListener(newVolume => {
      if (isTakePhoto.current === true) {
        isTakePhoto.current = false;
        return;
      } else {
        if (camera.current) {
          isTakePhoto.current = true;
          camera.current
            .takePhoto({
              flash: 'auto',
            })
            .then(photo => {
              console.log(photo.path);
              setTestImagePath(photo.path);
            })
            .catch(e => {
              console.error(e);
            })
            .finally(() => {
              // todo: 처음 사용자가 설정한 기본 볼륨으로 세팅하도록 변경
              setVolume(0.5);
            });
        }
      }
    });
    return () => {
      volumeBtnListener.remove();
    };
  }, []);

  if (!hasPermission)
    return <PermissionsPage requestPermission={requestPermission} />;
  if (device == undefined) return <NoCameraDeviceError />;
  return (
    <SafeAreaView>
      <Camera
        style={{width: '100%', height: '70%', display: 'flex'}}
        device={device}
        ref={camera}
        photo={true}
        isActive={true}
        format={format}
      />
      <Image
        src={testImagePath}
        style={{padding: '10%', width: '100%', height: '20%', display: 'flex'}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18,
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  bottomBar: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: '#ff4d4d',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
