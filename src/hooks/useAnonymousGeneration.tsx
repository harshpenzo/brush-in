import { useState, useEffect } from 'react';

const STORAGE_KEY = 'brushin_anonymous_usage';
const FREE_GENERATION_LIMIT = 2;

interface AnonymousUsage {
  count: number;
  lastUsed: string;
}

export const useAnonymousGeneration = () => {
  const [remainingGenerations, setRemainingGenerations] = useState<number>(FREE_GENERATION_LIMIT);
  const [canGenerate, setCanGenerate] = useState<boolean>(true);

  useEffect(() => {
    // Load usage from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const usage: AnonymousUsage = JSON.parse(stored);
        const remaining = FREE_GENERATION_LIMIT - usage.count;
        setRemainingGenerations(Math.max(0, remaining));
        setCanGenerate(remaining > 0);
      } catch (e) {
        console.error('Failed to parse anonymous usage:', e);
      }
    }
  }, []);

  const incrementUsage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let usage: AnonymousUsage = { count: 0, lastUsed: new Date().toISOString() };
    
    if (stored) {
      try {
        usage = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored usage:', e);
      }
    }

    usage.count += 1;
    usage.lastUsed = new Date().toISOString();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
    
    const remaining = FREE_GENERATION_LIMIT - usage.count;
    setRemainingGenerations(Math.max(0, remaining));
    setCanGenerate(remaining > 0);
  };

  const resetUsage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRemainingGenerations(FREE_GENERATION_LIMIT);
    setCanGenerate(true);
  };

  return {
    remainingGenerations,
    canGenerate,
    incrementUsage,
    resetUsage,
    isLimitReached: remainingGenerations === 0,
  };
};
