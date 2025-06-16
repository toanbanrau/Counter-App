import { Counter } from "@/hooks/useCounter";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "motion/react";
import React from "react";
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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: counter.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    touchAction: "none",
  };

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
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-4 bg-white rounded-lg shadow-md cursor-grab active:cursor-grabbing"
    >
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className="relative bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg text-white flex flex-col items-center"
      >
        {" "}
        <div
          {...listeners}
          className="absolute top-0 left-0 m-2 p-1 rounded-md bg-gray-100/50 hover:bg-gray-200/80 transition-colors cursor-grab active:cursor-grabbing"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </div>
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
          <button
            onClick={() => removeCounter(counter.id)}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-gray-700 text-lg font-semibold text-white shadow-md border-2 border-white/30 transition-all duration-200 hover:scale-105 focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CounterCard);
