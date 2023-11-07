const localStorage = {
    // Obtiene un valor del localStorage
    get(key) {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
  
    // Almacena un valor en localStorage
    set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
  
    // Elimina un valor del localStorage
    remove(key) {
      window.localStorage.removeItem(key);
    },
  
    // Limpia todo el localStorage
    clear() {
      window.localStorage.clear();
    },
  
    // Verifica si un elemento existe en localStorage
    has(key) {
      return window.localStorage.getItem(key) !== null;
    }
  };
  
  
  export default localStorage;