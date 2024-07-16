export const getItem = (item) => {
    try {
      const value = sessionStorage.getItem(item);
      if (value) return JSON.parse(value);
      return null;
    } catch (error) {
      return null;
    }
  };
  
  export const setItem = (key, item) => {
    sessionStorage.setItem(key, JSON.stringify(item));
  };
  