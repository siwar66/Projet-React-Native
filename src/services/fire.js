

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';

/**
 * Configuration Firebase
 * ⚠️ REMPLACER CES VALEURS PAR CELLES DE VOTRE PROJET FIREBASE
 */
const firebaseConfig = {
  apiKey: "AIzaSyDyKIxi8BCiI5CebhwuKBj57KY3pLBkQQo",
  authDomain: "myrecipes-1dcbd.firebaseapp.com",
  projectId: "myrecipes-1dcbd",
  storageBucket: "myrecipes-1dcbd.firebasestorage.app",
  messagingSenderId: "516981169394",
  appId: "1:516981169394:web:044c6177e8902641ebc46b",
  measurementId: "G-VZYGCWBDV5"
};

// Initialisation de Firebase
let app;
let db;
let isFirebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseInitialized = true;
} catch (error) {
  console.error('❌ Erreur Firebase:', error.message);
}

// Vérifier si Firebase est initialisé
const checkFirebaseInit = () => {
  if (!isFirebaseInitialized) {
    throw new Error('Firebase n\'est pas initialisé. Vérifiez votre configuration.');
  }
};


const RECIPES_COLLECTION = 'recipes';

/**
 * CREATE - Ajouter une nouvelle recette
 * @param {Object} recipeData - Données de la recette
 * @returns {Promise<string>} ID du document créé
 */
export const createRecipe = async (recipeData) => {
  try {
    checkFirebaseInit();
    
    const docRef = await addDoc(collection(db, RECIPES_COLLECTION), {
      ...recipeData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    
    return docRef.id;
  } catch (error) {
    if (error.code === 'permission-denied') {
      throw new Error('Accès refusé. Vérifiez les règles Firestore (mode test).');
    }
    throw new Error(`Erreur: ${error.message}`);
  }
};

/**
 * READ - Récupérer toutes les recettes (une seule fois)
 * @returns {Promise<Array>} Liste des recettes
 */
export const getAllRecipes = async () => {
  try {
    const q = query(
      collection(db, RECIPES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return recipes;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des recettes:', error);
    throw new Error('Impossible de charger les recettes.');
  }
};

/**
 * READ - Récupérer une recette par son ID
 * @param {string} id - ID du document
 * @returns {Promise<Object>} Données de la recette
 */
export const getRecipeById = async (id) => {
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Recette introuvable');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la recette:', error);
    throw new Error('Impossible de charger la recette.');
  }
};

/**
 * READ REALTIME - Écouter les changements en temps réel
 * @param {Function} callback - Fonction appelée à chaque changement
 * @returns {Function} Fonction pour se désabonner
 */
export const subscribeToRecipes = (callback) => {
  try {
    checkFirebaseInit();
    
    const q = query(
      collection(db, RECIPES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
          recipes.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        
        callback(recipes);
      },
      (error) => {
        if (error.code === 'permission-denied') {
          callback(null, new Error('Accès refusé. Activez le mode test dans Firestore.'));
        } else {
          callback(null, error);
        }
      }
    );
    
    return unsubscribe;
  } catch (error) {
    throw new Error('Impossible de s\'abonner aux mises à jour.');
  }
};

/**
 * UPDATE - Mettre à jour une recette existante
 * @param {string} id - ID du document
 * @param {Object} updates - Données à mettre à jour
 * @returns {Promise<void>}
 */
export const updateRecipe = async (id, updates) => {
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    
    console.log('✅ Recette mise à jour:', id);
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la recette:', error);
    throw new Error('Impossible de mettre à jour la recette.');
  }
};

/**
 * DELETE - Supprimer une recette
 * @param {string} id - ID du document à supprimer
 * @returns {Promise<void>}
 */
export const deleteRecipe = async (id) => {
  try {
    const docRef = doc(db, RECIPES_COLLECTION, id);
    await deleteDoc(docRef);
    
    console.log('✅ Recette supprimée:', id);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la recette:', error);
    throw new Error('Impossible de supprimer la recette.');
  }
};

/**
 * Export de l'instance Firestore (si besoin de requêtes personnalisées)
 */
export { db };
