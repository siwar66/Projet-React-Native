/**
 * networkUtils - Utilitaires de gestion réseau
 * 
 * Détection et gestion des erreurs réseau
 */

/**
 * Détermine si une erreur est liée au réseau
 * @param {Error} error - L'erreur à analyser
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  if (!error) return false;
  
  const message = error.message?.toLowerCase() || '';
  const networkKeywords = [
    'network',
    'timeout',
    'connexion',
    'offline',
    'internet',
    'fetch failed',
    'network request failed',
    'unable to resolve host',
  ];
  
  return networkKeywords.some(keyword => message.includes(keyword));
};

/**
 * Crée un message d'erreur convivial basé sur le type d'erreur
 * @param {Error} error - L'erreur à traiter
 * @returns {string}
 */
export const getErrorMessage = (error) => {
  if (!error) return 'Une erreur est survenue';
  
  if (isNetworkError(error)) {
    return ' Problème de connexion internet. Vérifiez votre réseau et réessayez.';
  }
  
  if (error.code === 'permission-denied') {
    return ' Accès refusé. Vérifiez la configuration Firebase.';
  }
  
  if (error.code === 'unavailable') {
    return ' Service temporairement indisponible. Réessayez dans quelques instants.';
  }
  
  return error.message || 'Une erreur est survenue';
};

/**
 * Exécute une action avec retry automatique en cas d'erreur réseau
 * @param {Function} action - Fonction async à exécuter
 * @param {number} maxRetries - Nombre maximum de tentatives
 * @param {number} delay - Délai entre les tentatives (ms)
 * @returns {Promise}
 */
export const retryOnNetworkError = async (action, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      
      if (!isNetworkError(error) || attempt === maxRetries) {
        throw error;
      }
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
};
