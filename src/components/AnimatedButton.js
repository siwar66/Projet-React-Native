/**
 * Composant AnimatedButton - Bouton avec animations et effet néon
 * 
 * Bouton réutilisable avec :
 * - Animation de press (scale)
 * - Effet néon sur le bord
 * - Loading state intégré
 * - Variants : primary, secondary, danger
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

const AnimatedButton = ({
  title,
  onPress,
  variant = 'primary', // primary | secondary | danger | outline
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const scaleAnim = new Animated.Value(1);
  
 
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary;
      case 'secondary':
        return styles.buttonSecondary;
      case 'danger':
        return styles.buttonDanger;
      case 'outline':
        return styles.buttonOutline;
      default:
        return styles.buttonPrimary;
    }
  };
  
  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.textOutline;
      default:
        return styles.text;
    }
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <Animated.View
      style={[
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[
          styles.button,
          getButtonStyle(),
          isDisabled && styles.buttonDisabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.text} size="small" />
        ) : (
          <>
            {icon ? <Text style={styles.icon}>{String(icon)}</Text> : null}
            <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: spacing.buttonHeight,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.radiusMedium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.accent,
  },
  buttonDanger: {
    backgroundColor: colors.error,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.styles.button,
    color: '#FFFFFF',
  },
  textOutline: {
    ...typography.styles.button,
    color: colors.primary,
  },
  icon: {
    fontSize: typography.sizes.lg,
    marginRight: spacing.xs,
  },
});

export default AnimatedButton;
