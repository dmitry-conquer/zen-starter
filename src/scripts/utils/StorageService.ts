export const LocalStorageService = {
  getItem<T>(key: string): any {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  setItem(key: string, value: any): void {
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
