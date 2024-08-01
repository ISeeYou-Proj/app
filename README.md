# 새싹 해커톤 I-See-You 앱개발 레포지토리

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/NativeWind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

---

## 개발환경 (사용 라이브러리)

- react-native: 0.74.3
- react-navigation/native: ^6.1.17
- react-navigation/native-stack: ^6.10.0
- react-navigation/bottom-tabs: ^6.6.0
- nativewind: ^2.0.11
  - tailwindcss: 3.3.2 (devDependencies)
- react-native-vision-camera: ^4.4.1
- react-native-volume-manager: ^1.10.0
- react-native-voice/voice: ^3.2.4
- react-native-fs: ^2.20.0
- react-native-webview: ^13.10.5
- react-native-view-shot: ^3.8.0
- react-native-image-crop-picker: ^0.41.2
- react-native-sound: ^0.11.2
- react-native-async-storage/async-storage
- axios: ^1.7.2

---

## 사용된 라이브러리 문서 (개인 참고용)

#### 카메라 기능을 구현하기 위한 react-native-vision-camera 라이브러리

- [공식 문서](https://react-native-vision-camera.com/docs/guides)

#### 사진 촬영, 음성녹음 시작 기능을 물리 버튼(볼륨 업, 다운)으로 사용할 수 있도록 하기 위해 사용한 react-native-volume-manager 라이브러리

- [공식 Github](https://github.com/hirbod/react-native-volume-manager)

#### React Native에서 TailwindCSS를 사용하기 위한 Nativewind 라이브러리

- [공식 문서](https://www.nativewind.dev/quick-starts/react-native-cli)

- [Nativewind 스타일 적용안됨 해결](https://github.com/nativewind/nativewind/issues/77#issuecomment-2169567817)

- [Nativewind와 TS 동시 사용](https://www.nativewind.dev/getting-started/typescript)

  - RN 프로젝트 루트에 `nativewind-env.d.ts` 파일 생성하고 `/// <reference types="nativewind/types" />` 추가로 해결

#### 페이지를 구현하기 위해 사용한 React Navigation 라이브러리

- [공식 문서](https://reactnavigation.org/docs/getting-started)

  - [Stack navigator](https://reactnavigation.org/docs/hello-react-navigation)

  - [Bottom tab navigator](https://reactnavigation.org/docs/bottom-tab-navigator)

  - [Nesting navigators](https://reactnavigation.org/docs/nesting-navigators/)

- [React Navigation과 TS 동시 사용 공식문서](https://reactnavigation.org/docs/typescript/)
- [React Navigation과 TS 동시 사용 블로그](https://velog.io/@hokim/react-native-2.-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99-feat.-tailwind#3-2-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%8A%A4%ED%83%9D-%EB%84%A4%EB%B9%84%EA%B2%8C%EC%9D%B4%ED%84%B0)

#### 음성 인식 STT를 통해 챗봇을 사용하도록 하기 위한 react-native-voice/voice 라이브러리

- [공식 Github](https://github.com/react-native-voice/voice)
- [참고 블로그](https://deku.posstree.com/ko/react-native/react-native-voice/)

#### 앱 내에서 웹브라우징을 할 수 있도록 하기 위한 react-native-webview 라이브러리

- [공식 Github](https://github.com/react-native-webview/react-native-webview)

#### 웹뷰 컴포넌트를 캡쳐하기 위한 react-native-view-shot 라이브러리

- [공식 Github](https://github.com/gre/react-native-view-shot)

#### 파일 경로를 사용해서 이미지를 불러오고, Base64로 인코딩하기 위한 react-native-fs 라이브러리

- [공식 Github](https://github.com/itinance/react-native-fs)

#### TTS 음성인 mp3 파일을 재생하기 위한 react-native-sound 라이브러리

- [공식 Github](https://github.com/zmxv/react-native-sound)

#### 갤러리에서 이미지를 불러오기 위한 react-native-image-crop-picker 라이브러리

- [공식 Github](https://github.com/ivpusic/react-native-image-crop-picker)

#### 사용자의 설정 정보 등을 기록하기 위한 react-native-async-storage/async-storage 라이브러리

- [공식 문서](https://react-native-async-storage.github.io/async-storage/docs/install)

---

## 안드로이드 .apk 빌드 참고

- [react native android app build](https://velog.io/@gth1123/react-native-android-app-build)
