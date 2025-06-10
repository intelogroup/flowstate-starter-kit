
class StorageService {
  private isAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch {
      return false;
    }
  }

  setItem(key: string, value: any, useSession = false): void {
    const storage = useSession ? 'sessionStorage' : 'localStorage';
    
    if (!this.isAvailable(storage)) {
      console.warn(`${storage} is not available`);
      return;
    }

    try {
      const serializedValue = JSON.stringify(value);
      window[storage].setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting ${storage} item:`, error);
    }
  }

  getItem<T>(key: string, useSession = false): T | null {
    const storage = useSession ? 'sessionStorage' : 'localStorage';
    
    if (!this.isAvailable(storage)) {
      return null;
    }

    try {
      const item = window[storage].getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${storage} item:`, error);
      return null;
    }
  }

  removeItem(key: string, useSession = false): void {
    const storage = useSession ? 'sessionStorage' : 'localStorage';
    
    if (!this.isAvailable(storage)) {
      return;
    }

    window[storage].removeItem(key);
  }

  clear(useSession = false): void {
    const storage = useSession ? 'sessionStorage' : 'localStorage';
    
    if (!this.isAvailable(storage)) {
      return;
    }

    window[storage].clear();
  }
}

export const storageService = new StorageService();
