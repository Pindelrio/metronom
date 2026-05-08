import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  onFinish: () => void;
}

export function SplashView({ onFinish }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(textOpacity, { toValue: 1, duration: 600, delay: 300, useNativeDriver: true }),
      ]),
      Animated.delay(1200),
      Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View style={{ transform: [{ scale: logoScale }] }}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={[styles.textBlock, { opacity: textOpacity }]}>
        <Text style={styles.title}>Metrònom</Text>
        <Text style={styles.subtitle}>By Pin del Río</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logo: {
    width: 180,
    height: 180,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '700',
    letterSpacing: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});
