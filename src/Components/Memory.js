import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const Memory = () => {
  //console.log("stationss = ", Engine.allStations);
  const [updateMemloc, setupdateMemloc] = useState("");
  const [updateMemValue, setupdateMemValue] = useState("");
  const [container, setcontainer] = useState([]);
  const [, forceRerender] = useState();

  const handleMemUpdate = () => {
    if (isNaN(parseInt(updateMemValue)) || isNaN(parseInt(updateMemloc)))
      alert("invalid input");

    Engine.memory.set(parseInt(updateMemloc), parseFloat(updateMemValue));
    console.log(Engine.memory);
    forceRerender({});
  };

  

  if (Engine.allStations === undefined) {
    return <h1>error</h1>;
  } else {
    return (
      <>
        <h2 className="text-center my-3">Memory</h2>
        <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive col-8 offset-2 mb-5">
          <div className="text-center my-3">
            <input
              placeholder="location"
              onChange={(e) => {
                setupdateMemloc(e.target.value);
              }}
              value={updateMemloc}
            />{" "}
            <input
              placeholder="value"
              onChange={(e) => {
                setupdateMemValue(e.target.value);
              }}
              value={updateMemValue}
            />{" "}
            <button className="btn btn-primary" onClick={handleMemUpdate}>
              update
            </button>
          </div>
          <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th>Address</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let container = [];
                Engine.memory.forEach((value, key) => {
                  container.push(
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  );
                });
                return container;
              })()}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default Memory;
