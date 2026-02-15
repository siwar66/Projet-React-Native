/**
 * Composant RecipeCard - Carte de recette animée et futuriste
 * 
 * Affiche une recette avec :
 * - Image en arrière-plan
 * - Effet glassmorphism
 * - Animation d'apparition progressive
 * - Feedback tactile au press
 * 
 * Utilisé dans : RecipeListScreen (TP1, TP2, TP3)
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

const RecipeCard = ({ recipe, onPress, index = 0 }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  
 
  const scaleAnim = new Animated.Value(1);
  
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100, 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);
  
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        {/* Image de fond */}
        {recipe.image && !imageError ? (
          <Image
            source={{ uri: recipe.image }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>{"👩‍🍳"}</Text>
          </View>
        )}
        
        {/* Overlay gradient pour lisibilité */}
        <View style={styles.overlay} />
        
        {/* Contenu avec effet glassmorphism */}
        <View style={styles.content}>
          {/* Titre */}
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title || 'Sans titre'}
          </Text>
          
          {/* Description / Catégorie */}
          {recipe.description ? (
            <Text style={styles.description} numberOfLines={1}>
              {String(recipe.description)}
            </Text>
          ) : null}
          
          {/* Informations complémentaires */}
          <View style={styles.footer}>
            {recipe.duration ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{`⏱️ ${recipe.duration}`}</Text>
              </View>
            ) : null}
            
            {recipe.difficulty ? (
              <View style={[styles.badge, styles.badgeDifficulty]}>
                <Text style={styles.badgeText}>{`${recipe.difficulty}`}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.cardMargin,
    borderRadius: spacing.radiusLarge,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...shadows.medium,
  },
  touchable: {
    position: 'relative',
    minHeight: 180,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 60,
    color: '#FFFFFF',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 107, 157, 0.15)', // Soft pink overlay
  },
  content: {
    padding: spacing.md,
    justifyContent: 'flex-end',
    minHeight: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White semi-transparent
    borderRadius: spacing.radiusLarge,
    margin: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusSmall,
    marginRight: spacing.xs,
  },
  badgeDifficulty: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    color: '#FFFFFF',
    fontWeight: typography.weights.medium,
  },
});

export default RecipeCard;
