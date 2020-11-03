// Mentor call with Rohit, provided me with working code

import { useState } from "react";

const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), mode]);
    } else {
      setHistory((prev) => [...prev, mode]);
    }
    setMode(mode);
  };
  const back = () => {
    const newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
    }
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };
  return { mode, transition, back };
};
export default useVisualMode;















