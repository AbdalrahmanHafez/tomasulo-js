import react, { useRef, useEffect, useState } from "react";
import "./Styles.css";
import Engine from "./Engine/Engine.js";
import InstructionQueue from "./Components/InstructionQueue.js";
import RegisterFile from "./Components/RegisterFile.js";
import GlobalInfo from "./Components/GlobalInfo";
import CRS from "./Components/CRS";

function App() {
  const newEngine = useRef(undefined);
  const [, forceRerender] = useState();

  useEffect(() => {
    const latencies = {
      ADD: 4,
      SUB: 2,
      MUL: 6,
      DIV: 4,
      LD: 1,
      ST: 2,
    };
    const rawInstructions = [
      "MUL R3, R1, R2",
      "ADD R5, R3, R4",
      "ADD R7, R2, R6",
      "ADD R10, R8, R9",
      "MUL R11, R7, R10",
      "ADD R5, R5, R11",
    ];
    newEngine.current = new Engine();
    newEngine.current.reactInitalize(rawInstructions, latencies);

    forceRerender({});
  }, []);
  const handleClick = () => {
    console.log("click, ", Engine.cycles);
    let stillExcuting = newEngine.current.reactTick();
    if (!stillExcuting) {
      alert("Done");
    }
    forceRerender({});
  };

  if (!Engine.instructionQueue) return <div>Loading</div>;
  return (
    <>
      <button onClick={handleClick}>Next Cycle</button>
      <GlobalInfo />
      <CRS type={"ADD"} />

      <InstructionQueue />
      <RegisterFile />
    </>
  );
}

export default App;
