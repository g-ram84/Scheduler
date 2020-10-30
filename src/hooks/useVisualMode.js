import React, { useState } from "react" ;

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) { 
    {replace && 
      history.pop()
    }
    setMode(newMode)
    setHistory(history.concat([newMode]))
   }
  function back() { 
  { history.length > 1 &&
    history.pop()
    setHistory([...history])
    setMode(history[history.length -1])
  }
}
  return { mode, transition, back };
}