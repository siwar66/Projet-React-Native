/**
 * RecipeDetailFirebaseScreen - Détail d'une recette Firebase avec DELETE
 * 
 * TP3 : Affichage détaillé + suppression
 * 
 * Fonctionnalités :
 * - Affichage du détail complet depuis Firestore
 * - Bouton Modifier (navigation vers RecipeForm)
 * - Bouton Supprimer avec confirmation
 * - Gestion des états
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import AnimatedButton from '../components/AnimatedButton';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import { getRecipeById, deleteRecipe } from '../services/fire';
import { getErrorMessage } from '../utils/networkUtils';

const { width } = Dimensions.get('window');

const RecipeDetailFirebaseScreen = ({ navigation, route }) => {
  const { recipeId } = route.params;
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    loadRecipe();
    
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [recipeId]);
  
  const loadRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleEdit = () => {
    navigation.navigate('RecipeForm', { recipeId });
  };
  
  
  const handleDelete = () => {
    Alert.alert(
      '🗑️ Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer "${recipe.title}" ?\n\nCette action est irréversible.`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };
  
  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteRecipe(recipeId);
      setToast({ message: 'Recette supprimée avec succès !', type: 'success' });
      setTimeout(() => navigation.goBack(), 1500);
    } catch (error) {
      setDeleting(false);
      const errorMsg = getErrorMessage(error);
      setToast({ message: errorMsg, type: 'error' });
    }
  };
  
  if (loading) {
    return <LoadingIndicator message="Chargement..." fullscreen />;
  }
  
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadRecipe}
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
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image principale - Décorative */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.logoEmoji}>{"👩‍🍳"}</Text>
          <Text style={styles.placeholderText}>{"MyRecipes"}</Text>
        </View>
        
        {/* Contenu */}
        <View style={styles.content}>
          {/* Titre */}
          <Text style={styles.title}>{recipe.title || 'Sans titre'}</Text>
        
        {/* Badges */}
        <View style={styles.badges}>
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
        
        {/* Description */}
        {recipe.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"📝 Description"}</Text>
            <Text style={styles.text}>{`${recipe.description}`}</Text>
          </View>
        ) : null}
        
        {/* Ingrédients */}
        {recipe.ingredients ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"🥘 Ingrédients"}</Text>
            <Text style={styles.text}>{`${recipe.ingredients}`}</Text>
          </View>
        ) : null}
        
        {/* Étapes */}
        {recipe.steps ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{"👨‍🍳 Préparation"}</Text>
            <Text style={styles.text}>{`${recipe.steps}`}</Text>
          </View>
        ) : null}      </View>      </ScrollView>
      
      {/* Actions */}
      <View style={styles.actions}>
        <AnimatedButton
          title="Modifier"
          onPress={handleEdit}
          variant="primary"
          style={styles.editButton}
          disabled={deleting}
        />
        <AnimatedButton
          title="Supprimer"
          onPress={handleDelete}
          variant="danger"
          style={styles.deleteButton}
          loading={deleting}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, 
  },
  imagePlaceholder: {
    width: width,
    height: width * 0.5,
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
  badgeDifficulty: {
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
  text: {
    ...typography.styles.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.radiusMedium,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.screenPadding,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    gap: spacing.sm,
  },
  editButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
  },
  errorText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default RecipeDetailFirebaseScreen;
