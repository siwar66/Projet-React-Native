/**
 * RecipeListScreen - Liste des recettes depuis l'API TheMealDB
 * 
 * TP2 : Affichage de recettes depuis une API externe
 * 
 * Fonctionnalités :
 * - Chargement depuis TheMealDB API (via service api.js)
 * - FlatList avec RecipeCard animé
 * - Gestion des états : loading, error, data
 * - Navigation vers le détail
 * - Pull-to-refresh (bonus)
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import RecipeCard from '../components/RecipeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import { searchRecipes } from '../services/api';
import { getErrorMessage } from '../utils/networkUtils';

const RecipeListScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  
  useEffect(() => {
    loadRecipes();
    
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  
  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      
      const data = await searchRecipes('chicken');
      setRecipes(data);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecipes();
    setRefreshing(false);
  };
  
  
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.id });
  };
  
  
  if (loading && !refreshing) {
    return <LoadingIndicator message="Chargement des recettes..." fullscreen />;
  }
  
  
  if (error && !refreshing) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadRecipes}
        fullscreen
      />
    );
  }
  
  
  if (recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucune recette trouvée</Text>
      </View>
    );
  }
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <RecipeCard
            recipe={item}
            onPress={() => handleRecipePress(item)}
            index={index}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  emptyText: {
    ...typography.styles.body,
    color: colors.textSecondary,
  },
});

export default RecipeListScreen;
