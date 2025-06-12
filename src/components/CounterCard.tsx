import { Counter } from "@/hooks/useCounter";

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
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-lg shadow-lg text-white flex flex-col items-center">
      <p className="text-5xl font-extrabold text-white drop-shadow mb-6">
        {counter.count}
      </p>
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
