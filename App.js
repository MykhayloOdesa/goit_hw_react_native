import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import UseRoute from './router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = UseRoute(true);

  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}
