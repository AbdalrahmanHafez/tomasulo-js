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
  const [isDone, setIsDone] = useState(false);
  const [txtInstructions, setTxtInstructions] = useState(
    "LD R1, 3\nMUL R3, R1, R2\nADD R5, R3, R4\nADD R7, R2, R6\nADD R10, R8, R9\nMUL R11, R7, R10\nADD R5, R5, R11"
  );

  useEffect(() => {
    let txtInst = document.getElementById("instructions");
    txtInst.focus();
  }, []);

  const handleClick = () => {
    console.log("click, ", Engine.cycles);
    let stillExcuting = newEngine.current.reactTick();
    if (!stillExcuting) {
      alert("Done");
      setIsDone(true);
      Engine.cycles--;
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

  // useEffect(() => {
  //   handleStart();
  // }, []);

  if (!Engine.instructionQueue) return <div>Loading</div>;
  return (
    <>
      <br />
      <div>
        <Row>
          <Col>
            <h2 className="mx-3">Input Instructions:</h2>
            <textarea
              className="mx-3"
              rows="10"
              cols="100"
              id="instructions"
              value={txtInstructions}
              onChange={(e) => setTxtInstructions(e.target.value.trim())}
            ></textarea>
          </Col>
          <Col>
            <h2>Input latency:</h2>
            <Col>
              <label className="mx-3">
                {" "}
                <b>ADD</b>
              </label>{""}
              <input type="number" id="latADD" defaultValue={4} />
            </Col>
            <br />
            <Col>
              <label className="mx-3">
                <b>SUB</b>
              </label>{" "}
              <input type="number" id="latSUB" defaultValue={2} />
            </Col>
            <br />
            <Col>
              <Col>
                <label className="mx-3">
                  <b>DIV</b>{""}
                </label>
                <input className="mx-2" type="number" id="latDIV" defaultValue={4} />
              </Col>
              <br />
              <label className="mx-3">
                <b>MUL</b>
              </label>{""}
              <input className="ml-2" type="number" id="latMUL" defaultValue={6} />
            </Col>
            <br />
            <Col>
              <label className="mx-4">
                <b>LD</b>
              </label>{""}
              <input type="number" id="latLD" defaultValue={1} />
            </Col>
            <br />
            <Col>
              <label className="mx-4">
                <b>ST</b>
              </label>{""}
              <input  type="number" id="latST" defaultValue={2} />
            </Col>
            <br />
          </Col>
        </Row>
      </div>

      <div className="text-center">
        <br />


        <button
          className="btn btn-primary btn-lg mx-3"
          onClick={handleStart}
          disabled={(isRunning || isDone)}
        >
          Start
        </button>

        <button
          className="btn btn-primary btn-lg"
          onClick={handleClick}
          disabled={!isRunning || isDone}
        >
          Next Cycle
        </button>
        <br />
      </div>
      {isRunning && (
        <>
          <GlobalInfo />
          <br />
         
          <InstructionQueue />
         
          <br />
          <Row>
          <Col>
          <CRS name={"ADD/SUB"} type={"ADD"} />
          </Col>
          
          <br />
          <Col>
          <CRS name={"MUL/DIV"} type={"MUL"} />
          </Col>
          </Row>
          <Row>
          <Col>
          <LoadBuffer />
          </Col>
          <br />
          <Col>
          <StoreBuffer />
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          <RegisterFile />
          </Col>
          <br />
          <Col>
          <Memory />
          </Col>
          </Row>
          <Row style={{marginLeft:"15cm"}}>
            <h2><b>Contributors:</b></h2>
            <h2>Youssef Alaa, Youssef Magdy</h2>
            <h2>Mohamed Yehia, Abdelrahman Hafz</h2>
            <h2>Mostafa Mohamed</h2>
          </Row>
        </>
      )}
    </>
  );
}

export default App;
