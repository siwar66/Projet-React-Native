/**
 * RecipeFormScreen - Formulaire de création/édition de recette
 * 
 * TP3 : CREATE & UPDATE
 * 
 * Fonctionnalités :
 * - Formulaire réutilisable pour création ET édition
 * - Logique : if (recipeId) → UPDATE, else → CREATE
 * - Validation basique
 * - Design futuriste avec TextInput stylisés
 * - Sauvegarde dans Firestore (via service fire.js)
 * - Retour automatique à la liste après succès
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import AnimatedButton from '../components/AnimatedButton';
import LoadingIndicator from '../components/LoadingIndicator';
import Toast from '../components/Toast';
import { createRecipe, updateRecipe, getRecipeById } from '../services/fire';
import { getErrorMessage } from '../utils/networkUtils';

const RecipeFormScreen = ({ navigation, route }) => {
  const recipeId = route.params?.recipeId; 
  const isEditing = !!recipeId;
  
  // États du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [toast, setToast] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  
  useEffect(() => {
    if (isEditing) {
      loadRecipe();
    }
    
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [recipeId]);
  
  const loadRecipe = async () => {
    try {
      const recipe = await getRecipeById(recipeId);
      
      
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
      setIngredients(recipe.ingredients || '');
      setSteps(recipe.steps || '');
      setDuration(recipe.duration || '');
      setDifficulty(recipe.difficulty || '');
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      Alert.alert('Erreur', errorMsg);
      navigation.goBack();
    } finally {
      setInitialLoading(false);
    }
  };
  
  
  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Erreur', 'Le titre est obligatoire');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Erreur', 'La description est obligatoire');
      return false;
    }
    return true;
  };
  
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      const recipeData = {
        title: title.trim(),
        description: description.trim(),
        ingredients: ingredients.trim(),
        steps: steps.trim(),
        duration: duration.trim() || '30 min',
        difficulty: difficulty.trim() || 'Moyen',
      };
      
      if (isEditing) {
        
        await updateRecipe(recipeId, recipeData);
        setToast({ message: 'Recette mise à jour avec succès !', type: 'success' });
        setTimeout(() => navigation.goBack(), 1500);
      } else {
        
        await createRecipe(recipeData);
        setToast({ message: 'Recette créée avec succès !', type: 'success' });
        setTimeout(() => navigation.goBack(), 1500);
      }
    } catch (error) {
      setLoading(false);
      const errorMsg = getErrorMessage(error);
      setToast({ message: errorMsg, type: 'error' });
    }
  };
  
  
  if (initialLoading) {
    return <LoadingIndicator message="Chargement..." fullscreen />;
  }
  
  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titre du formulaire */}
        <Text style={styles.pageTitle}>
          {isEditing ? "✏️ Modifier la recette" : "➕ Nouvelle recette"}
        </Text>
        
        {/* Champ Titre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Tarte aux pommes"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        
        {/* Champ Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Décrivez votre recette..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={3}
          />
        </View>
        
        {/* Champ Ingrédients */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ingrédients</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Ex: 3 pommes, 200g de farine..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
          />
        </View>
        
        {/* Champ Étapes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Étapes de préparation</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={steps}
            onChangeText={setSteps}
            placeholder="Décrivez les étapes..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={5}
          />
        </View>
        
        {/* Champ Durée */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Durée</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="Ex: 30 min"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        
        {/* Champ Difficulté */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Difficulté</Text>
          <TextInput
            style={styles.input}
            value={difficulty}
            onChangeText={setDifficulty}
            placeholder="Ex: Facile, Moyen, Difficile"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        
        {/* Bouton de soumission */}
        <AnimatedButton
          title={isEditing ? 'Mettre à jour' : 'Créer la recette'}
          onPress={handleSubmit}
          variant="primary"
          loading={loading}
          style={styles.submitButton}
        />
        
        {/* Bouton annuler */}
        <AnimatedButton
          title="Annuler"
          onPress={() => navigation.goBack()}
          variant="outline"
          disabled={loading}
          style={styles.cancelButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: spacing.screenPadding,
  },
  pageTitle: {
    ...typography.styles.h2,
    color: colors.text,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.styles.body,
    color: colors.text,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: spacing.radiusMedium,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.sizes.md,
    minHeight: spacing.inputHeight,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  cancelButton: {
    marginBottom: spacing.xl,
  },
});

export default RecipeFormScreen;
