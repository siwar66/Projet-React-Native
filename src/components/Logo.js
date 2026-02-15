/**
 * Logo Component - Logo MyRecipes
 * 
 * Affiche le logo de l'application
 * Fallback vers un logo généré par code si l'image n'est pas disponible
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, typography, shadows } from '../theme';

const Logo = ({ size = 200, showText = false }) => {
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.chefHatContainer}>
        <View style={styles.chefHat}>
          <View style={[styles.hatTop, { width: size * 0.3, height: size * 0.2 }]} />
          <View style={[styles.hatBase, { width: size * 0.4, height: size * 0.1 }]} />
        </View>
      </View>
      <View style={styles.heartContainer}>
        <Text style={[styles.heartIcon, { fontSize: size * 0.3 }]}>♥</Text>
      </View>
      {showText && (
        <Text style={[styles.logoText, { fontSize: size * 0.15 }]}>
          MyRecipes
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chefHatContainer: {
    position: 'absolute',
    top: '10%',
  },
  chefHat: {
    alignItems: 'center',
  },
  hatTop: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginBottom: -5,
  },
  hatBase: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  heartContainer: {
    position: 'absolute',
    top: '45%',
  },
  heartIcon: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  logoText: {
    position: 'absolute',
    bottom: '5%',
    color: colors.primary,
    fontWeight: typography.weights.bold,
    fontStyle: 'italic',
  },
});

export default Logo;
