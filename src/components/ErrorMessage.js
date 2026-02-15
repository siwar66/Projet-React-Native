/**
 * Composant ErrorMessage - Message d'erreur stylisé
 * 
 * Affiche les erreurs de manière élégante avec :
 * - Design cohérent avec le thème
 * - Icône d'erreur
 * - Message personnalisable
 * - Bouton de retry optionnel
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import AnimatedButton from './AnimatedButton';

const ErrorMessage = ({ message, onRetry, fullscreen = false }) => {
  const content = (
    <View style={styles.content}>
      {/* Icône d'erreur */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>
      
      {/* Message d'erreur */}
      <Text style={styles.message}>{message}</Text>
      
      {/* Bouton retry */}
      {onRetry && (
        <AnimatedButton
          title="Réessayer"
          onPress={onRetry}
          variant="outline"
          style={styles.retryButton}
        />
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
    padding: spacing.screenPadding,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.error,
  },
  icon: {
    fontSize: 40,
  },
  message: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
  },
  retryButton: {
    minWidth: 200,
  },
});

export default ErrorMessage;
