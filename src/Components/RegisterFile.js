import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Engine from "../Engine/Engine.js";

const RegisterFile = ({ engine }) => {
  const [updateReg, setupdateReg] = useState("");
  const [updateRegValue, setupdateRegValu] = useState("");
  const [, forceRerender] = useState();

  const handleRegisterUpdate = () => {
    if (updateRegValue === "" || updateReg === "") alert("invalid input");
    Engine.findRegister(updateReg).value = parseInt(updateRegValue);
    forceRerender({});
  };
  return (
    <>
      <h2 className="text-center my-3">Register File</h2>
      <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive col-10 offset-1 mb-5">
        <div className="text-left my-3">
          <input
            placeholder="r10"
            onChange={(e) => {
              setupdateReg(e.target.value.toUpperCase());
            }}
            value={updateReg}
          />{" "}
          <input
            placeholder="value"
            onChange={(e) => {
              setupdateRegValu(e.target.value);
            }}
            value={updateRegValue}
          />{" "}
          <button className="btn btn-primary" onClick={handleRegisterUpdate}>
            update
          </button>
        </div>

        <table className="table table-bordered table-striped mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Queue</th>
            </tr>
          </thead>
          <tbody>
            {Engine.RegisterFile.map((reg, i) => (
              <tr key={i}>
                <td>{reg.name}</td>
                <td>{reg.value}</td>
                <td>{reg.q}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisterFile;
