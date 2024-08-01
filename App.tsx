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
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        options={{
          headerShown: false,
          tabBarAccessibilityLabel: 'Camera Page',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./src/assets/camera_bold.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('./src/assets/camera.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ),
        }}
        component={CameraPage}
      />
      <Tab.Screen
        name="Screenshot"
        options={{
          headerShown: false,
          tabBarAccessibilityLabel: 'Screenshot Page',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./src/assets/web_bold.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('./src/assets/web.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ),
        }}
        component={ScreenshotPage}
      />
    </Tab.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Iseeyou"
      screenOptions={({navigation}) => ({
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('./src/assets/menu.png')}
              className="w-8 h-8 m-2 mt-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
      })}>
      <Drawer.Screen
        name="Iseeyou"
        component={BottomTabNav}
        options={{
          headerTransparent: true,
          drawerIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./src/assets/home_bold.png')}
                className="w-8 h-8 z-0"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('./src/assets/home.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ),
        }}
      />
      <Drawer.Screen
        name="Gallary"
        component={UploadImagePage}
        options={{
          headerTitle: 'Gallary',
          headerTransparent: false,
          drawerIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./src/assets/gallary_bold.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('./src/assets/gallary.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingPage}
        options={{
          headerTransparent: false,
          headerTitle: 'Setting',
          drawerIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('./src/assets/setting_bold.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('./src/assets/setting.png')}
                className="w-8 h-8"
                resizeMode="contain"
              />
            ),
        }}
      />
    </Drawer.Navigator>
  );
};
