/**
 * HomeScreen - Écran d'accueil de l'application
 * 
 * TP2 : Point d'entrée de la navigation
 * 
 * Affiche :
 * - Présentation de MyRecipes
 * - Design futuriste avec animations
 * - Navigation vers RecipeListScreen
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';
import AnimatedButton from '../components/AnimatedButton';

const HomeScreen = ({ navigation }) => {
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Logo / Icône */}
          <View style={styles.logoContainer}>
            <Animated.View style={[styles.logoWrapper, { opacity: fadeAnim }]}>
              <Image
                source={require('../../assets/logo_v2.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          
          {/* Titre principal */}
          <Text style={styles.title}>MyRecipes</Text>
          
          {/* Sous-titre */}
          <Text style={styles.subtitle}>
            Des recettes délicieuses pour tous les jours
          </Text>
          
      
          
          {/* Description */}
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>Commencez votre aventure culinaire</Text>
            <Text style={styles.description}>
              Explorez des milliers de recettes du monde entier ou créez et sauvegardez vos propres créations dans le cloud.
            </Text>
          </View>
          
          {/* Boutons d'action */}
          <View style={styles.actions}>
            <AnimatedButton
              title="Explorer les recettes"
              onPress={() => navigation.navigate('RecipeList')}
              variant="primary"
              style={styles.button}
            />
            
            <AnimatedButton
              title="Mes créations"
              onPress={() => navigation.navigate('MyRecipes')}
              variant="secondary"
              style={styles.button}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};


const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  logoWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    fontWeight: typography.weights.regular,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLarge,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...shadows.medium,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    fontWeight: typography.weights.medium,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.glassBorder,
  },
  descriptionCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLarge,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    ...shadows.medium,
    width: '100%',
  },
  descriptionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.sizes.md,
  },
  features: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  featureIcon: {
    fontSize: typography.sizes.xl,
    marginRight: spacing.sm,
  },
  featureText: {
    ...typography.styles.body,
    color: colors.text,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});

export default HomeScreen;
