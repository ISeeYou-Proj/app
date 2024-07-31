import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from './src/pages/Landingpage';
import CameraPage from './src/pages/Camerapage';
import ScreenshotPage from './src/pages/Screenshotpage';
import UploadImagePage from './src/pages/Uploadimagepage';

// React Navigation TS docs: https://reactnavigation.org/docs/typescript/
export type NavParamType = {
  Landing: undefined;
  Iseeyou: undefined;
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
