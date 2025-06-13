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
    <div className="">
      <div className="flex items-center w-full">
        <h1 className="text-4xl font-bold mb-4">Counter App</h1>
      </div>
      <button className="btn" onClick={creatCounter}>
        Add Couter
      </button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={counters}>
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
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CounterApp;
