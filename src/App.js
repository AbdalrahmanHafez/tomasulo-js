import Engine from "./Engine/Engine.js";

function App() {
  const handleClick = () => {
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
    console.log("click");
    let newEngine = new Engine();
    newEngine.run(rawInstructions, latencies);
  };
  return (
    <>
      <button onClick={handleClick}>Next Cycle</button>
    </>
  );
}

export default App;
