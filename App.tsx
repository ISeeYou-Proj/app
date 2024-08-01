import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LandingPage from './src/pages/Landingpage';
import CameraPage from './src/pages/Camerapage';
import ScreenshotPage from './src/pages/Screenshotpage';
import UploadImagePage from './src/pages/Uploadimagepage';
import MenuPage from './src/pages/Menupage';

// React Navigation TS docs: https://reactnavigation.org/docs/typescript/
export type NavParamType = {
  Landing: undefined;
  Drawer: undefined;
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
    </Tab.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Iseeyou" component={BottomTabNav} />
      <Drawer.Screen name="Menu" component={MenuPage} />
      <Drawer.Screen name="Gallary" component={UploadImagePage} />
    </Drawer.Navigator>
  );
};
