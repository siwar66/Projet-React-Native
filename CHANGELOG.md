# Changelog - MyRecipes

Tous les changements notables de ce projet sont documentés dans ce fichier.

---

## [1.0.0] - 2026-02-07

### 🎉 Version initiale - Projet complet

#### ✨ Ajouté

**TP1 - Interface de base**
- Liste de recettes avec FlatList
- Composant RecipeCard réutilisable et animé
- Données locales mockées (mockData.js)
- Design System complet (colors, spacing, typography)
- Animations d'apparition en cascade

**TP2 - Navigation et API**
- React Navigation (Stack Navigator)
- Service API pour TheMealDB
- HomeScreen : écran d'accueil
- RecipeListScreen : liste depuis API
- RecipeDetailScreen : détail d'une recette
- Gestion des états (loading, error, data)
- Pull-to-refresh sur la liste
- Navigation avec passage d'ID uniquement

**TP3 - Firebase Firestore**
- Configuration Firebase complète
- Service Firebase (fire.js) avec CRUD
- MyRecipesScreen : liste temps réel
- RecipeFormScreen : formulaire CREATE/UPDATE réutilisable
- RecipeDetailFirebaseScreen : détail avec DELETE
- Lecture temps réel avec onSnapshot
- Confirmation de suppression

**Composants réutilisables**
- RecipeCard : carte de recette avec animations
- AnimatedButton : bouton avec feedback tactile
- LoadingIndicator : indicateur de chargement stylisé
- ErrorMessage : affichage d'erreur élégant

**Design futuriste**
- Dark mode par défaut
- Palette néon (violet, bleu électrique)
- Glassmorphism
- Ombres avec effet néon
- Animations fluides (Animated API)
- Transitions d'écrans

**Configuration**
- package.json avec toutes les dépendances
- app.json configuré pour Expo
- babel.config.js
- .gitignore complet

**Documentation**
- README.md complet et pédagogique
- TP_GUIDE.md : guide détaillé des TPs
- QUICK_START.md : démarrage rapide
- TROUBLESHOOTING.md : dépannage
- .github/copilot-instructions.md

#### 🏗️ Architecture

- Structure modulaire propre
- Séparation des responsabilités
- Services isolés (API, Firebase)
- Design System centralisé
- Composants réutilisables

#### 📱 Compatibilité

- React Native 0.73
- Expo ~50.0
- iOS et Android
- Support Web (partiel)

---

## À venir

### [1.1.0] - Améliorations UX
- [ ] Authentification Firebase
- [ ] Favoris locaux (AsyncStorage)
- [ ] Recherche dans les recettes
- [ ] Filtres par catégorie/difficulté

### [1.2.0] - Fonctionnalités avancées
- [ ] Upload d'images (Firebase Storage)
- [ ] Mode hors ligne
- [ ] Notifications push
- [ ] Partage social

### [2.0.0] - Version premium
- [ ] Backend custom (Node.js)
- [ ] Recommandations IA
- [ ] Mode communautaire
- [ ] Application web (React.js)

---

## Notes de version

### Version sémantique
Ce projet suit le [Semantic Versioning](https://semver.org/) :
- **MAJOR** : changements incompatibles
- **MINOR** : nouvelles fonctionnalités compatibles
- **PATCH** : corrections de bugs

### Tags Git
Chaque version est taguée dans Git :
```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Projet complet"
```

---

## Légende

- ✨ Ajouté : nouvelle fonctionnalité
- 🐛 Corrigé : correction de bug
- 🔧 Modifié : changement de fonctionnalité existante
- ❌ Supprimé : fonctionnalité retirée
- 🔒 Sécurité : correction de sécurité
- 📚 Documentation : amélioration de la documentation
- ⚡ Performance : amélioration des performances
