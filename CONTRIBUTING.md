# 🤝 Guide de contribution

Merci de votre intérêt pour contribuer à MyRecipes ! Ce document explique comment participer au projet.

---

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Standards de code](#standards-de-code)
- [Processus de développement](#processus-de-développement)
- [Structure des commits](#structure-des-commits)
- [Tests](#tests)

---

## Code de conduite

Ce projet respecte un code de conduite. En participant, vous vous engagez à maintenir un environnement respectueux et inclusif.

---

## Comment contribuer

### Signaler un bug 🐛

1. Vérifier que le bug n'a pas déjà été signalé
2. Créer une issue avec :
   - Titre clair et descriptif
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si pertinent
   - Environnement (OS, version Expo, Node.js)

### Proposer une fonctionnalité ✨

1. Créer une issue de type "Feature Request"
2. Décrire la fonctionnalité
3. Expliquer le besoin utilisateur
4. Proposer une solution technique

### Contribuer au code 💻

1. Fork le projet
2. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
3. Coder en suivant les standards
4. Commiter : `git commit -m "feat: ajouter ma fonctionnalité"`
5. Pousser : `git push origin feature/ma-fonctionnalite`
6. Créer une Pull Request

---

## Standards de code

### Structure des fichiers

```javascript
/**
 * Nom du composant - Description courte
 * 
 * TP X : Contexte pédagogique
 * 
 * Fonctionnalités :
 * - Fonctionnalité 1
 * - Fonctionnalité 2
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

const MonComposant = ({ prop1, prop2 }) => {
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

export default MonComposant;
```

### Règles de style

**Nommage**
- Composants : PascalCase (`RecipeCard`)
- Fichiers de composants : PascalCase (`RecipeCard.js`)
- Fonctions : camelCase (`loadRecipes`)
- Constantes : UPPER_SNAKE_CASE (`BASE_URL`)

**Imports**
```javascript

import React, { useState } from 'react';
import { View, Text } from 'react-native';


import { useNavigation } from '@react-navigation/native';


import RecipeCard from '../components/RecipeCard';
import { colors } from '../theme';
import { searchRecipes } from '../services/api';
```

**Commentaires**
- Commenter le "pourquoi", pas le "quoi"
- Utiliser JSDoc pour les fonctions exportées
- Commenter les parties complexes

```javascript
/**
 * Recherche des recettes par nom
 * @param {string} query - Terme de recherche
 * @returns {Promise<Array>} Liste des recettes
 */
export const searchRecipes = async (query) => {
  // ...
};
```

### Gestion des erreurs

```javascript

try {
  const data = await searchRecipes(query);
  setRecipes(data);
} catch (error) {
  console.error('Erreur:', error);
  setError(error.message);
}


const data = await searchRecipes(query); 
```

### Gestion des états

```javascript

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


const [data, setData] = useState([]);
```

---

## Processus de développement

### 1. Setup local

```bash
# Cloner votre fork
git clone https://github.com/VOTRE_USERNAME/myrecipes.git
cd myrecipes

# Installer les dépendances
npm install

# Créer une branche
git checkout -b feature/ma-fonctionnalite
```

### 2. Développement

- Tester régulièrement sur un appareil physique
- Suivre les standards de code
- Ajouter des commentaires explicatifs
- Respecter l'architecture existante

### 3. Tests

```bash
# Lancer l'application
npm start

# Tester toutes les fonctionnalités affectées
# - Navigation
# - API
# - Firebase
# - Animations
```

### 4. Pull Request

**Titre** :
```
feat(recettes): ajouter la recherche par catégorie
```

**Description** :
```markdown
## Description
Ajoute la possibilité de filtrer les recettes par catégorie.

## Motivation
Les utilisateurs veulent trouver rapidement des recettes d'une catégorie spécifique.

## Changements
- Ajout d'un composant CategoryFilter
- Modification de RecipeListScreen pour supporter les filtres
- Mise à jour de l'API service

## Captures d'écran
[Screenshots ici]

## Checklist
- [x] Code testé sur iOS
- [x] Code testé sur Android
- [x] Documentation mise à jour
- [x] Pas de warning dans la console
```

---

## Structure des commits

Suivre la [convention Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope>): <description>

[corps optionnel]

[footer optionnel]
```

**Types** :
- `feat`: nouvelle fonctionnalité
- `fix`: correction de bug
- `docs`: documentation
- `style`: formatage (pas de changement de code)
- `refactor`: refactorisation
- `test`: ajout de tests
- `chore`: tâches de maintenance

**Exemples** :
```bash
git commit -m "feat(recettes): ajouter la recherche"
git commit -m "fix(firebase): corriger l'erreur de permission"
git commit -m "docs(readme): mettre à jour les instructions"
git commit -m "style(theme): ajuster les couleurs"
```

---

## Tests

### Tests manuels

Avant de soumettre une PR, tester :

**Navigation**
- [x] Tous les écrans sont accessibles
- [x] Le bouton retour fonctionne
- [x] Les paramètres sont passés correctement

**API**
- [x] Les recettes se chargent
- [x] Les erreurs sont gérées
- [x] Le pull-to-refresh fonctionne

**Firebase**
- [x] CREATE : création de recette
- [x] READ : liste temps réel
- [x] UPDATE : modification
- [x] DELETE : suppression avec confirmation

**Design**
- [x] Pas de débordement de texte
- [x] Les images s'affichent
- [x] Les animations sont fluides
- [x] Le thème est cohérent

### Tests automatisés

(À venir)
```bash
npm test
```

---

## Organisation du travail

### Branches

- `main` : version stable
- `develop` : version en développement
- `feature/*` : nouvelles fonctionnalités
- `fix/*` : corrections de bugs
- `docs/*` : documentation

### Labels GitHub

- `bug` : bug à corriger
- `enhancement` : amélioration
- `documentation` : doc à mettre à jour
- `good first issue` : bon pour débuter
- `help wanted` : aide recherchée

---

## Ressources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Firebase Docs](https://firebase.google.com/docs)

---

## Questions ?

- Créer une issue avec le label `question`
- Consulter les issues existantes
- Lire la documentation dans `/docs`

---

**Merci pour votre contribution ! 🎉**
