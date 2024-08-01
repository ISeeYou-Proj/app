import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from './src/pages/Landingpage';
import CameraPage from './src/pages/Camerapage';
import ScreenshotPage from './src/pages/Screenshotpage';
import UploadImagePage from './src/pages/Uploadimagepage';

import EyeSetting from './src/pages/tutorialpage/Eyesetting';
import Page2 from './src/pages/tutorialpage/Page2';
import Page3 from './src/pages/tutorialpage/Page3';

// React Navigation TS docs: https://reactnavigation.org/docs/typescript/
export type NavParamType = {
  Landing: undefined;
  Iseeyou: undefined;
  Tutorial: undefined;
};

export type TutorialType = {
  EyeSetting: undefined;
  Page2: undefined;
  Page3: undefined;
};

export default function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<NavParamType>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          options={{headerShown: false}}
          component={LandingPage}
        />
        <Stack.Screen name="Iseeyou" component={BottomTabNav} />
        <Stack.Screen
          name="Tutorial"
          component={TutorialNav}
          options={{title: '환영합니다'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Camera"
        options={{headerShown: false}}
        component={CameraPage}
      />
      <Tab.Screen
        name="Screenshot"
        options={{headerShown: false}}
        component={ScreenshotPage}
      />
      <Tab.Screen
        name="Uploadimage"
        options={{headerShown: false}}
        component={UploadImagePage}
      />
    </Tab.Navigator>
  );
};

const TutorialNav = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Eyesetting"
        options={{headerShown: false}}
        component={EyeSetting}
      />
      <Stack.Screen
        name="Page2"
        options={{headerShown: false}}
        component={Page2}
      />
      <Stack.Screen
        name="Page3"
        options={{headerShown: false}}
        component={Page3}
      />
    </Stack.Navigator>
  );
};
