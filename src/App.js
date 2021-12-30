import { run } from "./Engine/main.js";

function App() {
  const handleClick = () => {
    const rawInstructions = [
      "ADD R1, 1, 2",
      "MUL R2, R1, 3",
      "SUB R3, R2, R1",
      "LD R4, 3(R1)",
      "ST R5, 4(R2)",
    ];
    console.log("click");
    // console.log(engine);
    run(rawInstructions);
  };
  return (
    <>
      <button onClick={handleClick}>eeee</button>
    </>
  );
}

export default App;
