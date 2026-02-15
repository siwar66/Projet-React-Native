# MyRecipes - Instructions Copilot

## Vue d'ensemble

MyRecipes est une application mobile React Native/Expo de recettes de cuisine avec :
- Architecture modulaire propre
- Design futuriste dark mode avec animations
- Intégration API externe (TheMealDB)
- Backend Firebase Firestore

## Architecture

### Structure des dossiers
- `/src/screens` : Écrans de l'application
- `/src/components` : Composants réutilisables
- `/src/services` : Services externes (API, Firebase)
- `/src/theme` : Design system (colors, spacing, typography)

### Règles importantes

1. **Séparation des responsabilités**
   - Jamais de fetch() dans les écrans
   - Tous les appels API dans `/services/api.js`
   - Firebase uniquement dans `/services/fire.js`

2. **Gestion des états**
   - Pattern : loading / error / data
   - LoadingIndicator pour loading
   - ErrorMessage pour error

3. **Navigation**
   - Stack Navigator
   - Passer uniquement les IDs, pas les objets complets

4. **Styling**
   - Utiliser le Design System (`theme/`)
   - StyleSheet pour tous les styles
   - Pas de styles inline

5. **Firebase**
   - Configuration dans `fire.js` uniquement
   - CRUD complet implémenté
   - Lecture temps réel avec `onSnapshot`

## Commandes utiles

```bash
npm start          # Lancer Expo
npm run android    # Émulateur Android
npm run ios        # Simulateur iOS
```

## Dépendances principales

- React Native 0.73
- Expo ~50.0
- React Navigation 6.x
- Firebase 10.x

## Contact API

TheMealDB : https://www.themealdb.com/api.php
