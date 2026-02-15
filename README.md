# 🍽️ MyRecipes - Application Mobile de Recettes

![React Native](https://img.shields.io/badge/React%20Native-0.73-blue)
![Expo](https://img.shields.io/badge/Expo-~50.0-black)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)

> Application mobile React Native moderne pour découvrir, créer et gérer des recettes de cuisine. Projet académique respectant les standards commerciaux avec une architecture scalable et un design futuriste.

---

## 📋 Table des matières

- [Présentation](#-présentation)
- [Captures d'écran](#-captures-décran)
- [Objectifs pédagogiques](#-objectifs-pédagogiques)
- [Architecture technique](#-architecture-technique)
- [APIs et services](#-apis-et-services)
- [Installation](#-installation)
- [Configuration Firebase](#-configuration-firebase)
- [Lancement](#-lancement)
- [Flux de navigation](#-flux-de-navigation)
- [Fonctionnalités détaillées](#-fonctionnalités-détaillées)
- [Choix techniques](#-choix-techniques)
- [Difficultés rencontrées](#-difficultés-rencontrées)
- [Axes d'évolution](#-axes-dévolution)

---

## 🎯 Présentation

**MyRecipes** est une application mobile de recettes de cuisine développée avec **React Native** et **Expo**. Elle combine à la fois :
- Une **interface futuriste** avec animations fluides et design premium
- Une **architecture propre** respectant les bonnes pratiques (séparation des responsabilités)
- Des **fonctionnalités complètes** : consultation d'API externe, gestion locale avec Firebase

### Pourquoi ce thème ?
Le thème des recettes de cuisine a été choisi pour :
- Sa **pertinence universelle** (tout le monde cuisine)
- Sa **richesse fonctionnelle** (listes, détails, créations)
- La disponibilité d'une **API publique gratuite** (TheMealDB)
- La possibilité d'avoir un **design visuellement attractif**

---

## 📱 Captures d'écran

*(À ajouter : captures d'écran de l'application)*

---

## 🎓 Objectifs pédagogiques

Ce projet couvre **3 travaux pratiques** progressifs :

### TP1 - Interface utilisateur de base ✅
- Création d'une **liste de recettes locales**
- Utilisation obligatoire de **FlatList**
- Composant réutilisable **RecipeCard**
- Système de **design cohérent** (couleurs, espacements, typographie)
- Animations d'apparition

### TP2 - Navigation et API ✅
- Configuration de **React Navigation** (Stack Navigator)
- Intégration de l'API externe **TheMealDB**
- Gestion des états : **loading**, **error**, **data**
- Service dédié pour les appels réseau
- Navigation entre écrans avec passage de paramètres

### TP3 - Firebase et CRUD complet ✅
- Configuration **Firebase Firestore**
- **CREATE** : Formulaire de création de recette
- **READ** : Liste temps réel depuis Firestore
- **UPDATE** : Modification d'une recette existante
- **DELETE** : Suppression avec confirmation
- Formulaire réutilisable pour création et édition

---

## 🏗️ Architecture technique

### Structure du projet

```
myrecipes/
├── App.js                          # Point d'entrée + React Navigation
├── src/
│   ├── screens/                    # Écrans de l'application
│   │   ├── HomeScreen.js           # Écran d'accueil
│   │   ├── RecipeListScreen.js     # Liste API (TP2)
│   │   ├── RecipeDetailScreen.js   # Détail API (TP2)
│   │   ├── MyRecipesScreen.js      # Liste Firebase (TP3)
│   │   ├── RecipeDetailFirebaseScreen.js  # Détail Firebase (TP3)
│   │   └── RecipeFormScreen.js     # Formulaire Create/Update (TP3)
│   ├── components/                 # Composants réutilisables
│   │   ├── RecipeCard.js           # Carte de recette animée
│   │   ├── AnimatedButton.js       # Bouton avec effets
│   │   ├── LoadingIndicator.js     # Indicateur de chargement
│   │   └── ErrorMessage.js         # Affichage d'erreur élégant
│   ├── services/                   # Services externes (isolation)
│   │   ├── api.js                  # TheMealDB API
│   │   └── fire.js                 # Firebase Firestore (SEUL point d'accès)
│   └── theme/                      # Design System
│       ├── colors.js               # Palette de couleurs
│       ├── spacing.js              # Espacements et dimensions
│       ├── typography.js           # Styles de texte
│       └── index.js                # Export centralisé
├── package.json
├── app.json
└── README.md
```

### Principes d'architecture

✅ **Séparation des responsabilités** :
- **Écrans** : Gèrent la logique métier et les états
- **Composants** : Réutilisables, sans logique métier
- **Services** : Isolent toute communication externe

✅ **Aucun fetch() dans les écrans** :
- Tous les appels réseau passent par `/services/api.js`
- Firebase isolé dans `/services/fire.js`

✅ **Design System** :
- Couleurs, espacements, typographie centralisés
- Cohérence visuelle sur toute l'app

---

## 🌐 APIs et services

### TheMealDB (API publique)

**URL** : [https://www.themealdb.com](https://www.themealdb.com)

**Documentation** : [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

**Endpoints utilisés** :
- Recherche : `GET /api/json/v1/1/search.php?s={query}`
- Détail : `GET /api/json/v1/1/lookup.php?i={id}`

**Pourquoi TheMealDB ?**
- API **gratuite** et **sans clé** (parfait pour un projet académique)
- Données riches (images, ingrédients, instructions)
- Documentation claire
- Fiabilité élevée

### Firebase Firestore

**Collection** : `recipes`

**Structure d'un document** :
```javascript
{
  title: "Tarte aux pommes",
  description: "Délicieuse tarte maison",
  ingredients: "3 pommes, 200g farine, 100g beurre...",
  steps: "1. Préchauffer le four...",
  duration: "45 min",
  difficulty: "Moyen",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Fonctionnalités** :
- Lecture **temps réel** (`onSnapshot`)
- CRUD complet via `/services/fire.js`

---

## 🚀 Installation

### Prérequis

- **Node.js** 18+ : [https://nodejs.org](https://nodejs.org)
- **Expo Go** installé sur votre smartphone :
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Étapes

1. **Cloner le projet** :
   ```bash
   git clone <url-du-repo>
   cd react_native
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer Firebase** (voir section suivante)

4. **Lancer le projet** :
   ```bash
   npm start
   ```

---

## 🔥 Configuration Firebase

### 1. Créer un projet Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquer sur **"Ajouter un projet"**
3. Suivre les étapes (nom du projet, Analytics optionnel)

### 2. Activer Firestore

1. Dans la console Firebase, aller dans **"Firestore Database"**
2. Cliquer sur **"Créer une base de données"**
3. Choisir **"Mode test"** (règles ouvertes pour 30 jours)
4. Sélectionner une région proche

### 3. Récupérer les credentials

1. Dans **Paramètres du projet** ⚙️
2. Aller dans **"Vos applications"**
3. Cliquer sur l'icône **Web** `</>`
4. Copier l'objet `firebaseConfig`

### 4. Configurer dans le code

Ouvrir `src/services/fire.js` et remplacer :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};
```

---

## 📱 Lancement

### Développement local

```bash
npm start
```

Cela lance **Expo Metro Bundler**. Ensuite :
- Scannez le **QR code** avec :
  - **Expo Go** (Android)
  - **Appareil photo** (iOS, puis ouvrir dans Expo Go)

### Autre méthodes

```bash
npm run android    # Émulateur Android
npm run ios        # Simulateur iOS (macOS uniquement)
npm run web        # Navigateur web
```

---

## 🧭 Flux de navigation

```
HomeScreen (Accueil)
  ├─→ RecipeListScreen (Recettes API)
  │     └─→ RecipeDetailScreen (Détail API)
  │
  └─→ MyRecipesScreen (Mes recettes Firebase)
        ├─→ RecipeDetailFirebaseScreen (Détail + Modifier/Supprimer)
        │     └─→ RecipeFormScreen (mode édition)
        │
        └─→ RecipeFormScreen (mode création)
```

### Schéma de données

```
┌─────────────┐
│  TP1 - UI   │  Données locales (mock)
└─────────────┘
       ↓
┌─────────────┐
│ TP2 - API   │  TheMealDB (lecture seule)
└─────────────┘
       ↓
┌─────────────┐
│ TP3 - CRUD  │  Firebase Firestore (lecture/écriture)
└─────────────┘
```

---

## ⚡ Fonctionnalités détaillées

### 🎨 Design System futuriste

- **Dark mode** par défaut
- Palette de couleurs **néon** (violet, bleu électrique)
- Effet **glassmorphism** sur les cartes
- **Ombres néon** pour les éléments interactifs
- Animations fluides avec **Animated API**

### 📋 Gestion des états

Chaque écran gérant des données asynchrones suit ce pattern :

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

États possibles :
- **loading** → Affichage de `LoadingIndicator`
- **error** → Affichage de `ErrorMessage` avec bouton retry
- **data** → Affichage du contenu

### 🔄 Pull-to-refresh

Implémenté sur `RecipeListScreen` :
- Tirer vers le bas pour recharger
- Indicateur stylisé aux couleurs du thème

### ✨ Animations

- **Apparition en cascade** des cartes (stagger effect)
- **Feedback tactile** au press (scale + opacity)
- **Transitions d'écrans** fluides
- **Pulsation** sur le loading indicator

---

## 🧠 Choix techniques

### React Native + Expo

**Pourquoi ?**
- **Expo** simplifie la configuration (pas d'Android Studio/Xcode requis)
- **Hot reload** pour développement rapide
- Compatible iOS et Android sans changement de code

### React Navigation

**Pourquoi Stack Navigator ?**
- Gestion native des transitions
- Header configurable
- Navigation modale pour le formulaire
- API simple et intuitive

### Firebase Firestore

**Pourquoi Firestore ?**
- Base de données **NoSQL** en temps réel
- **Gratuite** pour petits projets (Spark plan)
- SDK JavaScript officiel
- Lecture temps réel avec `onSnapshot`

### TheMealDB

**Pourquoi cette API ?**
- **100% gratuite**, sans clé d'API
- Données de qualité avec images HD
- Documentation claire
- Pas de limite de requêtes

---

## 🚧 Difficultés rencontrées

### 1. Gestion des états asynchrones
**Problème** : Synchronisation entre loading/error/data  
**Solution** : Pattern strict avec 3 états séparés

### 2. Navigation avec paramètres
**Problème** : Passer des objets complets alourdissait la navigation  
**Solution** : Passer uniquement l'`id`, recharger les données dans l'écran de destination

### 3. Réutilisation du formulaire
**Problème** : Dupliquer le formulaire pour CREATE et UPDATE  
**Solution** : Un seul composant avec logique conditionnelle `if (recipeId)`

### 4. Animations performantes
**Problème** : Animations saccadées avec trop de composants  
**Solution** : Utilisation de `useNativeDriver: true` et optimisation des re-renders

### 5. Configuration Firebase
**Problème** : Erreur d'initialisation si mauvaises credentials  
**Solution** : Documentation claire dans `fire.js` avec placeholder explicite

---

## 🚀 Axes d'évolution

### Court terme
- [ ] **Authentification Firebase** (register/login)
- [ ] **Favoris** (sauvegarde locale avec AsyncStorage)
- [ ] **Recherche** dans les recettes Firebase
- [ ] **Upload d'images** (Firebase Storage)
- [ ] **Filtres** par catégorie/difficulté

### Moyen terme
- [ ] **Mode hors ligne** (cache des recettes)
- [ ] **Notifications push** (nouvelles recettes)
- [ ] **Partage social** (Facebook, Instagram)
- [ ] **Mode clair** (light theme)
- [ ] **Traduction** (i18n)

### Long terme
- [ ] **Backend custom** (Node.js + Express)
- [ ] **Recommandations IA** (basées sur l'historique)
- [ ] **Mode communautaire** (partage entre utilisateurs)
- [ ] **Application web** (React.js)

---

## 📚 Ressources utilisées

- [Documentation Expo](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TheMealDB API](https://www.themealdb.com/api.php)
- [React Native Docs](https://reactnative.dev)

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d'un TP académique React Native.

---

## 📄 Licence

Ce projet est à usage éducatif uniquement.

---

## ✅ Checklist de validation

### TP1 - UI de base
- [x] FlatList utilisé pour afficher une liste
- [x] Composant RecipeCard réutilisable
- [x] Données locales structurées
- [x] StyleSheet pour le styling
- [x] Design cohérent

### TP2 - API & Navigation
- [x] React Navigation configuré (Stack)
- [x] Appels API via service dédié (api.js)
- [x] Gestion loading/error/data
- [x] Navigation avec passage d'ID uniquement
- [x] Écrans : Home, List, Detail

### TP3 - Firebase CRUD
- [x] Firebase configuré (fire.js)
- [x] CREATE : Formulaire de création
- [x] READ : Liste temps réel
- [x] UPDATE : Modification via même formulaire
- [x] DELETE : Suppression avec confirmation
- [x] Collection "recipes" dans Firestore

### Bonus
- [x] Animations fluides
- [x] Pull-to-refresh
- [x] Design futuriste/premium
- [x] Architecture scalable
- [x] Code commenté et clair

---

**🎉 Projet complet et fonctionnel !**
