"use client";
import { Counter, useCounter } from "@/hooks/useCounter";
import CounterCard from "./CounterCard";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const CounterApp = () => {
  const {
    counters,
    setCounters,
    creatCounter,
    increment,
    decrement,
    reset,
    undo,
    redo,
    removeCounter,
  } = useCounter();

  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCounters((prevCounters) => {
        const oldIndex = prevCounters.findIndex((c) => c.id === active.id);
        const newIndex = prevCounters.findIndex((c) => c.id === over?.id);
        return arrayMove(prevCounters, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      </div>
      <button
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-600 hover:to-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200"
        onClick={creatCounter}
      >
        Add Counter
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={counters.map((counter) => counter.id)}>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 border p-4 rounded shadow-lg">
            {counters.map((counter: Counter) => (
              <CounterCard
                key={counter.id}
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
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CounterApp;
