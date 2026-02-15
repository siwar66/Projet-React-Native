/**
 * Composant LoadingIndicator - Indicateur de chargement stylisé
 * 
 * Indicateur de loading avec :
 * - Animation de rotation
 * - Design futuriste avec effet néon
 * - Texte personnalisable
 * - Utilisation dans tous les écrans avec états de chargement
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

const LoadingIndicator = ({ message = 'Chargement...', fullscreen = false }) => {
 
  const pulseAnim = new Animated.Value(1);
  
  useEffect(() => {
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  const content = (
    <View style={styles.content}>
      {/* Cercle extérieur avec effet néon */}
      <Animated.View
        style={[
          styles.neonCircle,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </Animated.View>
      
      {/* Message de chargement */}
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
  
  if (fullscreen) {
    return (
      <View style={styles.fullscreenContainer}>
        {content}
      </View>
    );
  }
  
  return content;
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  neonCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
   
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  message: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
