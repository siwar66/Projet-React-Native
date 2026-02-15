/**
 * Toast - Messages de notification élégants
 * 
 * Affiche des messages temporaires en haut de l'écran
 * avec animation de slide-in/slide-out
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

const { width } = Dimensions.get('window');

const Toast = ({ message, type = 'success', duration = 3000, onHide }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    
    const timer = setTimeout(() => {
      hideToast();
    }, duration);
    
    return () => clearTimeout(timer);
  }, []);
  
  const hideToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  };
  
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.primary;
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={hideToast}
        activeOpacity={0.9}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: spacing.screenPadding,
    right: spacing.screenPadding,
    borderRadius: spacing.radiusLarge,
    zIndex: 9999,
    ...shadows.medium,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  icon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: spacing.sm,
    fontWeight: typography.weights.bold,
  },
  message: {
    flex: 1,
    ...typography.styles.body,
    color: '#FFFFFF',
    fontWeight: typography.weights.medium,
  },
});

export default Toast;
