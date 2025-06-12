"use client";
import { Counter, useCounter } from "@/hooks/useCounter";
import CounterCard from "./CounterCard";


const CounterApp = () => {
  const {
    counters,
    creatCounter,
    increment,
    decrement,
    reset,
    undo,
    redo,
    removeCounter,
  } = useCounter();



  return (
    <div className="">
      <div className="flex items-center w-full">
        <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      </div>
      <button className="btn" onClick={creatCounter}>
        Add Couter
      </button>
      <div className="grid grid-cols-4 gap-5 border p-4 rounded shadow-lg">
        {counters.map((counter: Counter, index: number) => (
          <CounterCard
            key={index}
            undo={undo}
            redo={redo}
            counter={counter}
            increment={increment}
            decrement={decrement}
            reset={reset}
            removeCounter={removeCounter}
          />
        ))}
      </div>
    </div>
  );
};

export default CounterApp;
