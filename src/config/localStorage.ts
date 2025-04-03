export const localStorageConfig = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  saveItem: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
