import { useState, useEffect } from 'react';

export function useCookie<T>(key: string, initialValue: T, days = 30): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Leer cookie al montar
  useEffect(() => {
    try {
      const cookies = document.cookie.split('; ');
      const cookie = cookies.find(row => row.startsWith(`${key}=`));
      if (cookie) {
        const value = cookie.split('=')[1];
        setStoredValue(JSON.parse(decodeURIComponent(value)));
      }
    } catch (error) {
      console.error(`Error reading cookie "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Guardar cookie
      const encodedValue = encodeURIComponent(JSON.stringify(valueToStore));
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${key}=${encodedValue}; expires=${date.toUTCString()}; path=/`;
    } catch (error) {
      console.error(`Error setting cookie "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}