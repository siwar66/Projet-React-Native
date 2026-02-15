/**
 * RecipeDetailScreen - Détail d'une recette
 * 
 * TP2 : Affichage du détail complet d'une recette
 * 
 * Fonctionnalités :
 * - Reçoit UNIQUEMENT l'id en paramètre de navigation
 * - Charge les détails depuis l'API (via service api.js)
 * - Affichage élégant avec ScrollView
 * - Gestion des états : loading, error, data
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { getRecipeById } from '../services/api';
import { getErrorMessage } from '../utils/networkUtils';

const { width } = Dimensions.get('window');

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    loadRecipeDetail();
    
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [recipeId]);
  
  
  const loadRecipeDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  if (loading) {
    return <LoadingIndicator message="Chargement de la recette..." fullscreen />;
  }
  
  
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadRecipeDetail}
        fullscreen
      />
    );
  }
  
  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recette introuvable</Text>
      </View>
    );
  }
  
  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Image principale */}
      {recipe.image && !imageError ? (
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.logoEmoji}>{"👩‍🍳"}</Text>
          <Text style={styles.placeholderText}>{"MyRecipes"}</Text>
        </View>
      )}
      
      {/* Contenu */}
      <View style={styles.content}>
        {/* Titre */}
        <Text style={styles.title}>{recipe.title || 'Sans titre'}</Text>
        
        {/* Badges */}
        <View style={styles.badges}>
          {recipe.category ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{`${recipe.category}`}</Text>
            </View>
          ) : null}
          {recipe.area ? (
            <View style={[styles.badge, styles.badgeArea]}>
              <Text style={styles.badgeText}>{`🌍 ${recipe.area}`}</Text>
            </View>
          ) : null}
          {recipe.duration ? (
            <View style={[styles.badge, styles.badgeDuration]}>
              <Text style={styles.badgeText}>{`⏱️ ${recipe.duration}`}</Text>
            </View>
          ) : null}
        </View>
        
        {/* Ingrédients */}
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"📋 Ingrédients"}</Text>
            <View style={styles.ingredientsContainer}>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>{"•"}</Text>
                  <Text style={styles.ingredientText}>
                    {`${ingredient.measure || ''} ${ingredient.name || ''}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        
        {/* Instructions */}
        {recipe.instructions ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"👨‍🍳 Instructions"}</Text>
            <Text style={styles.instructions}>{`${recipe.instructions}`}</Text>
          </View>
        ) : null}
        
        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"🏷️ Tags"}</Text>
            <View style={styles.tagsContainer}>
              {recipe.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{`${tag}`}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    width: width,
    height: width * 0.75,
  },
  imagePlaceholder: {
    width: width,
    height: width * 0.75,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: spacing.sm,
  },
  placeholderText: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  content: {
    padding: spacing.screenPadding,
  },
  title: {
    ...typography.styles.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  badge: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusSmall,
  },
  badgeArea: {
    borderColor: colors.secondary,
  },
  badgeDuration: {
    borderColor: colors.primary,
  },
  badgeText: {
    ...typography.styles.caption,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.styles.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  ingredientsContainer: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusMedium,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  ingredientBullet: {
    ...typography.styles.body,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: typography.weights.bold,
  },
  ingredientText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    flex: 1,
  },
  instructions: {
    ...typography.styles.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.radiusMedium,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusSmall,
  },
  tagText: {
    ...typography.styles.caption,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  errorText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default RecipeDetailScreen;
