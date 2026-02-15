/**
 * MyRecipesScreen - Liste des recettes personnelles depuis Firebase
 * 
 * TP3 : Affichage des recettes stockées dans Firestore
 * 
 * Fonctionnalités :
 * - Lecture temps réel depuis Firestore (via service fire.js)
 * - FlatList avec RecipeCard animé
 * - Bouton de création
 * - Navigation vers le formulaire et le détail
 * - Gestion états : loading, error, empty, data
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';
import RecipeCard from '../components/RecipeCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import AnimatedButton from '../components/AnimatedButton';
import Toast from '../components/Toast';
import { subscribeToRecipes } from '../services/fire';
import { getErrorMessage } from '../utils/networkUtils';

const MyRecipesScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    loadRecipes();
    
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const loadRecipes = () => {
    
    const timeoutId = setTimeout(() => {
      if (loading && !refreshing) {
        const errorMsg = getErrorMessage(new Error('timeout'));
        setError(errorMsg);
        setLoading(false);
      }
    }, 10000);
    
    
    let unsubscribe;
    try {
      unsubscribe = subscribeToRecipes((data, err) => {
        clearTimeout(timeoutId);
        
        if (err) {
          const errorMsg = getErrorMessage(err);
          setError(errorMsg);
          setLoading(false);
          setRefreshing(false);
          return;
        }
        
        setRecipes(data);
        setLoading(false);
        setRefreshing(false);
        setError(null);
      });
    } catch (err) {
      clearTimeout(timeoutId);
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      setLoading(false);
      setRefreshing(false);
    }
    
    
    return () => {
      clearTimeout(timeoutId);
      if (unsubscribe) unsubscribe();
    };
  };
  
  
  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadRecipes();
  };
  
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetailFirebase', { recipeId: recipe.id });
  };
  
  
  const handleCreatePress = () => {
    navigation.navigate('RecipeForm');
  };
  
  
  if (loading) {
    return <LoadingIndicator message="Chargement de vos recettes..." fullscreen />;
  }
  
  
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>{"⚠️"}</Text>
        <Text style={styles.errorTitle}>{"Erreur Firebase"}</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        
        <View style={styles.errorHelp}>
          <Text style={styles.errorHelpTitle}>{"💡 Solutions :"}</Text>
          <Text style={styles.errorHelpText}>
            1. Vérifiez que Firestore est activé{'\n'}
            2. Activez le mode test dans les règles{'\n'}
            3. Vérifiez votre connexion internet{'\n'}
            4. Consultez FIREBASE_SETUP.md
          </Text>
        </View>
        
        <AnimatedButton
          title="Réessayer"
          onPress={() => {
            setError(null);
            setLoading(true);
            navigation.replace('MyRecipes');
          }}
          variant="primary"
          style={styles.retryButton}
        />
        
        <AnimatedButton
          title="Retour"
          onPress={() => navigation.goBack()}
          variant="outline"
        />
      </View>
    );
  }
  
  
  if (recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{"📝"}</Text>
        <Text style={styles.emptyTitle}>{"Aucune recette"}</Text>
        <Text style={styles.emptyText}>
          Commencez par créer votre première recette !
        </Text>
        <AnimatedButton
          title="Créer une recette"
          onPress={handleCreatePress}
          variant="primary"
          style={styles.createButton}
        />
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
            colors={[colors.primary]}
            tintColor={colors.primary}
            progressBackgroundColor={colors.surface}
          />
        }
      />
      
      {/* Bouton flottant de création */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreatePress}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>{"➕"}</Text>
      </TouchableOpacity>
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
    paddingBottom: 100, // Espace pour le FAB
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  errorIcon: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  errorTitle: {
    ...typography.styles.h2,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  errorMessage: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorHelp: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusMedium,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    width: '100%',
  },
  errorHelpTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  errorHelpText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
  },
  retryButton: {
    marginBottom: spacing.sm,
    minWidth: 200,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.styles.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  createButton: {
    minWidth: 200,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.screenPadding,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
  },
});

export default MyRecipesScreen;
