import { Counter } from "@/hooks/useCounter";
import { motion } from "motion/react";
import { useState } from "react";

interface CounterCardProps {
  counter: Counter;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  reset: (id: string) => void;
  removeCounter: (id: string) => void;
  undo: (id: string) => void;
  redo: (id: string) => void;
}

const CounterCard = ({
  counter,
  increment,
  decrement,
  reset,
  removeCounter,
  undo,
  redo,
}: CounterCardProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isFocused) return;
    event.preventDefault();
    if (event.key === "ArrowUp") {
      increment(counter.id);
    }
    if (event.key === "ArrowDown") {
      decrement(counter.id);
    }
  };

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg text-white flex flex-col items-center"
    >
      <motion.p
        key={counter.count}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-5xl font-extrabold text-white drop-shadow mb-6"
      >
        {counter.count}
      </motion.p>
      <div>
        <button
          onClick={() => decrement(counter.id)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          -
        </button>
        <button
          onClick={() => increment(counter.id)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          +
        </button>
        <button
          onClick={() => reset(counter.id)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          Reset
        </button>
      </div>
      <div>
        <button
          onClick={() => undo(counter.id)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          Undo
        </button>
        <button
          onClick={() => redo(counter.id)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
        >
          Redo
        </button>
        <button onClick={() => removeCounter(counter.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CounterCard;
