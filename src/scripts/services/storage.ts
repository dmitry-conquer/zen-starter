const LocalStorage = {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    localStorage.clear();
  },
  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  },
};

export default LocalStorage;
