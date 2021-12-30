import react, { useRef, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import "./Styles.css";
import Engine from "./Engine/Engine.js";
import Col from "react-bootstrap/Col";
import InstructionQueue from "./Components/InstructionQueue.js";
import RegisterFile from "./Components/RegisterFile.js";
import GlobalInfo from "./Components/GlobalInfo";
import CRS from "./Components/CRS";
import LoadBuffer from "./Components/LoadBuffer";
import StoreBuffer from "./Components/StoreBuffer";
import Memory from "./Components/Memory";

function App() {
  const newEngine = useRef(undefined);
  const [, forceRerender] = useState();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let txtInst = document.getElementById("instructions");
    txtInst.textContent =
      "LD R1, 3\nMUL R3, R1, R2\nADD R5, R3, R4\nADD R7, R2, R6\nADD R10, R8, R9\nMUL R11, R7, R10\nADD R5, R5, R11";
    txtInst.focus();
  }, []);

  const handleClick = () => {
    console.log("click, ", Engine.cycles);
    let stillExcuting = newEngine.current.reactTick();
    if (!stillExcuting) {
      alert("Done");
    }
    forceRerender({});
  };

  const handleStart = () => {
    let ADD = parseInt(document.getElementById("latADD").value);
    let SUB = parseInt(document.getElementById("latSUB").value);
    let MUL = parseInt(document.getElementById("latMUL").value);
    let DIV = parseInt(document.getElementById("latDIV").value);
    let LD = parseInt(document.getElementById("latLD").value);
    let ST = parseInt(document.getElementById("latST").value);
    let latencies = {
      ADD,
      SUB,
      MUL,
      DIV,
      LD,
      ST,
    };

    let rawInstructions = document
      .getElementById("instructions")
      .value.split("\n");

    console.log(latencies);
    console.log(rawInstructions);

    // const latencies2 = {
    //   ADD: 4,
    //   SUB: 2,
    //   MUL: 6,
    //   DIV: 4,
    //   LD: 1,
    //   ST: 2,
    // };
    // LD R1, 3
    // MUL R3, R1, R2
    // ADD R5, R3, R4
    // ADD R7, R2, R6
    // ADD R10, R8, R9
    // MUL R11, R7, R10
    // ADD R5, R5, R11
    // const rawInstructions = [
    //   "LD R1, 3",
    //   "MUL R3, R1, R2",
    //   "ADD R5, R3, R4",
    //   "ADD R7, R2, R6",
    //   "ADD R10, R8, R9",
    //   "MUL R11, R7, R10",
    //   "ADD R5, R5, R11",
    // ];

    newEngine.current = new Engine();
    newEngine.current.reactInitalize(rawInstructions, latencies);
    forceRerender({});

    setIsRunning(true);
  };

  if (!Engine.instructionQueue) return <div>Loading</div>;
  return (
    <>
      <br />
      <div>
        <Row>
          <Col>
            <h2>Input Instructions:</h2>
            <textarea rows="10" cols="100" id="instructions"></textarea>
          </Col>
          <Col>
            <h2>Input latency:</h2>
            <Col>
              <label>
                {" "}
                <b>ADD</b>
              </label>{" "}
              <input type="number" id="latADD" defaultValue={4} />
            </Col>
            <br />
            <Col>
              <label>
                <b>SUB</b>
              </label>{" "}
              <input type="number" id="latSUB" defaultValue={2} />
            </Col>
            <br />
            <Col>
              <Col>
                <label>
                  <b>DIV</b>
                </label>{" "}
                <input type="number" id="latDIV" defaultValue={4} />
              </Col>
              <br />
              <label>
                <b>MUL</b>
              </label>{" "}
              <input type="number" id="latMUL" defaultValue={6} />
            </Col>
            <br />
            <Col>
              <label>
                <b>LD</b>{" "}
              </label>{" "}
              <input type="number" id="latLD" defaultValue={1} />
            </Col>
            <br />
            <Col>
              <label>
                <b>ST</b>
              </label>{" "}
              <input type="number" id="latST" defaultValue={2} />
            </Col>
            <br />
          </Col>
        </Row>
      </div>
      <div className="text-center">
        <br />

        <button
          className="btn btn-primary btn-lg"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="btn btn-primary btn-lg"
          onClick={handleClick}
          disabled={!isRunning}
        >
          Next Cycle
        </button>
        <br />

        <GlobalInfo />
      </div>
      <br />
      <InstructionQueue />
      <br />
      <CRS name={"ADD/SUB"} type={"ADD"} />
      <br />
      <CRS name={"MUL/DIV"} type={"MUL"} />
      <LoadBuffer />
      <br />
      <StoreBuffer />
      <br />
      <RegisterFile />
      <br />
      <Memory />
    </>
  );
}

export default App;
