'use client'
import { useEffect, useState } from 'react'
import { useCounterHistory } from './useHistory'

export interface Counter {
  id: string
  count: number
}

export const useCounter = () => {
  const [counters, setCounters] = useState<Counter[]>([])
  const { updateHistory, undo: undoHistory, redo: redoHistory } = useCounterHistory();

  useEffect(() => {
    const key = Object.keys(localStorage);
    const counters = key.map((key) => {
      return JSON.parse(localStorage.getItem(`${key}`) || '{}')
    });
    setCounters(counters);
  }, []);

  const updateCount = (id: string, count: number) => {
    setCounters((prev) =>
      prev.map((counter) => {
        if (counter.id === id) {
          const newCouter = { ...counter, count };
          localStorage.setItem(`counter_${id}`, JSON.stringify(newCouter));
          return newCouter;
        }
        return counter;
      }),
    );
  };

  const increment = (id: string) => {
    const counter = counters.find((counter) => counter.id === id)!;
    if (!counter) return;
    updateHistory(id, { type: 'increment', prev: counter.count });
    updateCount(id, counter.count + 1)
  };

  const decrement = (id: string) => {
    const counter = counters.find((counter) => counter.id === id)!;
    if (!counter) return;
    updateHistory(id, { type: 'decrement', prev: counter.count });
    updateCount(id, counter.count - 1);
  };

  const reset = (id: string) => {
    const counter = counters.find((counter) => counter.id === id)!
    if (!counter) return;
    updateHistory(id, { type: 'reset', prev: counter.count });
    updateCount(id, 0);
  };

  const creatCounter = () => {
    const id = Date.now().toString();
    const count = 0;
    const newCounter = { count, id };
    localStorage.setItem(`counter_${id}`, JSON.stringify(newCounter));
    setCounters((prev) => [...prev, newCounter]);
  };

  const removeCounter = (id: string) => {
    setCounters((prev) => prev.filter((counter) => counter.id !== id))!;
    localStorage.removeItem(`counter_${id}`);
  };

  const redo = (id: string) => {
    const counter = counters.find((c) => c.id === id);
    if (!counter) return;
    redoHistory(
      id,
      () => counter.count,
      (value) => updateCount(id, value),
    );
  };

  const undo = (id: string) => {
    const counter = counters.find((c) => c.id === id);
    if (!counter) return;
    undoHistory(
      id,
      () => counter.count,
      (value) => updateCount(id, value),
    );
  };

  return {
    counters,
    setCounters,
    increment,
    decrement,
    reset,
    creatCounter,
    removeCounter,
    undo,
    redo,
  };
};
