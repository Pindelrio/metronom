import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { BRAND_BLUE } from '../../constants/colors';
import { PLAY_BUTTON_SIZE, RADIUS_FULL } from '../../constants/layout';
import { useMetronomeStore } from '../../store/metronomeStore';

export function PlayButton() {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const togglePlay = useMetronomeStore((s) => s.togglePlay);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [isPlaying]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    togglePlay();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[styles.btn, isPlaying && styles.playing, { transform: [{ scale }] }]}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#fff" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  btn: {
    width: PLAY_BUTTON_SIZE,
    height: PLAY_BUTTON_SIZE,
    borderRadius: RADIUS_FULL,
    backgroundColor: BRAND_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BRAND_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.6,
    elevation: 12,
  },
  playing: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
});
