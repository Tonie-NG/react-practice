import { useState } from "react";
import "./App.css";

type Tpoint = { x: number; y: number };

function App() {
  const [point, setPoint] = useState<Tpoint[]>([]);
  const [popped, setPopped] = useState<Tpoint[]>([]);

  function handleAddCircle(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    setPoint((prev) => [...prev, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    const newPoint = [...point];
    const poppedPoint = newPoint.pop();
    if (poppedPoint) {
      setPopped([...popped, poppedPoint!]);
    }

    setPoint(newPoint);
  }

  function handleRedo(e: React.MouseEvent) {
    const newPopped = [...popped];
    const newPoint = [...point];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    newPoint.push(poppedPoint!);
    setPopped(newPopped);
    setPoint(newPoint);
  }
  return (
    <>
      <div className="buttons">
        <button
          className="undo"
          disabled={point.length === 0}
          onClick={handleUndo}
        >
          undo
        </button>
        <button
          className="undo"
          disabled={popped.length === 0}
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
      <div className="app" onClick={handleAddCircle}>
        {point.map((p, index) => (
          <div
            className="point"
            key={index}
            style={{ left: p.x + "px", top: p.y + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
