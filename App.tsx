import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BACKGROUND_DARK } from './src/constants/colors';
import { MetronomeScreen } from './src/screens/MetronomeScreen';
import { SplashView } from './src/screens/SplashView';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [nativeReady, setNativeReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setNativeReady(true);
  }, []);

  const onLayout = useCallback(async () => {
    if (nativeReady) {
      await SplashScreen.hideAsync();
    }
  }, [nativeReady]);

  if (!nativeReady) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: BACKGROUND_DARK }} onLayout={onLayout}>
        <StatusBar style="light" />
        <MetronomeScreen />
        {showSplash && <SplashView onFinish={() => setShowSplash(false)} />}
      </View>
    </SafeAreaProvider>
  );
}
