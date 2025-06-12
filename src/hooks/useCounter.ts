'use client'
import { useEffect, useState } from "react";


type History = {
 type: 'increment' | 'decrement' | 'reset',
 prev: number
};

export interface Counter { 
  id: string;
  count: number;
  history: History[];
  future:History[]
}

export const useCounter = () => {

  const [counters, setCounters] = useState<Counter[]>([]);

  useEffect(() => {
    const key = Object.keys(localStorage);
    const counters = key.map((key) => {
      return JSON.parse(localStorage.getItem(`${key}`) || '{}');
    });
    setCounters(counters);
  }, []);
  
  const increment = (id:string) => {
      setCounters(prev => prev.map(counter => {
        if(counter.id === id){
          const newHistory:History[] = [...counter.history || [],{type:'increment',prev:counter.count}];
          const newCouter = {...counter,count:counter.count + 1,history:newHistory}
          localStorage.setItem(`counter_${id}`,JSON.stringify(newCouter));
          return newCouter;
        }
        return counter
      }))
  }

  const decrement = (id:string) => {
    setCounters(prev => prev.map(counter => {
        if(counter.id === id){
          const newHistory:History[] = [...counter.history || [],{type:'decrement',prev:counter.count}];
          const newCouter = {...counter,count:counter.count - 1,history:newHistory}
          localStorage.setItem(`counter_${id}`,JSON.stringify(newCouter));
          return newCouter
        }
        return counter
      }))
  }

  const reset = (id:string) =>{
    setCounters(prev => prev.map(counter => {
        if(counter.id === id){
          const newHistory:History[] = [...counter.history || [],{type:'reset',prev:counter.count}];
          const newCouter = {...counter,count:0,history:newHistory}
          localStorage.setItem(`counter_${id}`,JSON.stringify(newCouter));
          return newCouter
        }
        return counter
      }))
  }

  

  const creatCounter = () => {
    const id = Date.now().toString()
    const count = 0
    const history:History[] = []
    const future:History[] = []
    const newCounter = {count,id,history,future}
    localStorage.setItem(`counter_${id}`,JSON.stringify(newCounter))
    setCounters(prev => [...prev,newCounter])
  }

  const removeCounter = (id:string) =>{
     setCounters(prev => prev.filter(counter => counter.id !== id))
     localStorage.removeItem(`counter_${id}`)
  }
  
  const undo = (id:string) =>{
     setCounters(prev => prev.map(counter => {
        if(counter.id === id){
          if(!counter.history.length) return counter
          const last = counter.history[counter.history.length - 1]
          const newHistory = counter.history.slice(0,- 1)
          const newFuture = [...counter.future || [],last]
          const newCounter = { ...counter,count: last.prev,history: newHistory,future: newFuture,
      };
          localStorage.setItem(`counter_${id}`,JSON.stringify(newCounter));
          return newCounter
        }
        return counter
      }))
  }
  const redo = (id:string) =>{
      setCounters(prev => prev.map(counter => {
        if(counter.id === id){
           if(!counter.future.length) return counter
          const last = counter.future[counter.future.length - 1]
          const newFuture = counter.future.slice(0,- 1)
          const newHistory = [...counter.history || [],last]
           const newCounter = {...counter,count: last.prev,history: newHistory,future: newFuture,
            };
        localStorage.setItem(`counter_${id}`,JSON.stringify(newCounter));
          return newCounter
        }
        return counter
      }))

  }
   
  return {
     counters,setCounters,increment,decrement,reset,creatCounter,removeCounter,undo,redo,
  }
}