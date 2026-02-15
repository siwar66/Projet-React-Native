/**
 * FirebaseDebugPanel - Panneau de débogage Firebase
 * 
 * Affiche l'état de la connexion Firebase en temps réel
 * Utiliser temporairement pour diagnostiquer les problèmes
 * 
 * Usage :
 * import FirebaseDebugPanel from '../components/FirebaseDebugPanel';
 * <FirebaseDebugPanel />
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { subscribeToRecipes } from '../services/fire';

const FirebaseDebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('Vérification...');
  const [count, setCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  
  useEffect(() => {
    console.log('🔍 FirebaseDebugPanel: Test de connexion');
    
    const unsubscribe = subscribeToRecipes((data, err) => {
      if (err) {
        console.error('🔍 Debug: ERREUR', err.message);
        setStatus('❌ Erreur');
        setLastError(err.message);
        setCount(0);
        return;
      }
      
      console.log('🔍 Debug: OK,', data.length, 'document(s)');
      setStatus('✅ Connecté');
      setCount(data.length);
      setLastError(null);
    });
    
    return () => unsubscribe();
  }, []);
  
  if (!isOpen) {
    return (
      <TouchableOpacity 
        style={styles.badge} 
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.badgeText}>🔍 Debug Firebase</Text>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Firebase Status</Text>
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>État :</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Documents :</Text>
        <Text style={styles.value}>{count}</Text>
      </View>
      
      {lastError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Erreur :</Text>
          <Text style={styles.errorText}>{lastError}</Text>
        </View>
      )}
      
      <View style={styles.tips}>
        <Text style={styles.tipsTitle}>💡 Si "❌ Erreur" :</Text>
        <Text style={styles.tipsText}>
          1. Vérifiez Firebase Console{'\n'}
          2. Activez Firestore (mode test){'\n'}
          3. Consultez FIREBASE_SETUP.md
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radiusSmall,
    zIndex: 1000,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  panel: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusMedium,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  closeButton: {
    fontSize: typography.sizes.xl,
    color: colors.textSecondary,
    paddingHorizontal: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  label: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  value: {
    fontSize: typography.sizes.md,
    color: colors.text,
    fontWeight: typography.weights.bold,
  },
  errorBox: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: spacing.radiusSmall,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  errorTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.error,
    marginBottom: spacing.xs,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.xs,
  },
  tips: {
    marginTop: spacing.sm,
    backgroundColor: colors.glass,
    borderRadius: spacing.radiusSmall,
    padding: spacing.sm,
  },
  tipsTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tipsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.xs,
  },
});

export default FirebaseDebugPanel;
