import { useState } from "react";

type Action = {
  type: "increment" | "decrement" | "reset";
  prev: number;
};

type HistoryMap = {
  [id: string]: Action[];
};

type FutureMap = {
  [id: string]: Action[];
};

export const useCounterHistory = () => {
  const [historyMap, setHistoryMap] = useState<HistoryMap>({});
  const [futureMap, setFutureMap] = useState<FutureMap>({});

  const updateHistory = (id: string, action: Action) => {
    setHistoryMap((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), action],
    }));
  };

  const undo = (id: string, apply: (value: number) => void) => {
    const last = historyMap[id]?.at(-1);
    if (!last) return;

    setHistoryMap((prev) => ({
      ...prev,
      [id]: prev[id].slice(0, -1),
    }));

    setFutureMap((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { ...last }],
    }));
    apply(last.prev);
  };

  const redo = (
    id: string,
    getCurrent: () => number,
    apply: (value: number) => void,
  ) => {
    const last = futureMap[id]?.at(-1);
    if (!last) return;

    const current = getCurrent();

    const newCount =
      last.type === "increment"
        ? current + 1
        : last.type === "decrement"
          ? current - 1
          : last.type === "reset"
            ? 0
            : current;

    setFutureMap((prev) => ({
      ...prev,
      [id]: prev[id].slice(0, -1),
    }));

    setHistoryMap((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { type: last.type, prev: current }],
    }));

    apply(newCount);
  };

  return { updateHistory, undo, redo };
};
