import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from './src/pages/Landingpage';
import CameraPage from './src/pages/Camerapage';
import ScreenshotPage from './src/pages/Screenshotpage';
import UploadImagePage from './src/pages/Uploadimagepage';
import SettingPage from './src/pages/Settingpage';

// React Navigation TS docs: https://reactnavigation.org/docs/typescript/
export type NavParamType = {
  Landing: undefined;
  Drawer: undefined;
  Tutorial: undefined;
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
        <Stack.Screen
          name="Drawer"
          options={{headerShown: false}}
          component={DrawerNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Camera">
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
    </Tab.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Iseeyou">
      <Drawer.Screen name="Iseeyou" component={BottomTabNav} />
      <Drawer.Screen name="Gallary" component={UploadImagePage} />
      <Drawer.Screen name="Setting" component={SettingPage} />
    </Drawer.Navigator>
  );
};
