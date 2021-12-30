import Engine from "../Engine/Engine.js";

const InstructionQueue = ({ engine }) => {
  //   console.log("InstructionQueue, engine", Engine.cycles);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Instruction</th>
            <th>Issued</th>
            <th>Started</th>
            <th>Ended</th>
            <th>WriteBack</th>
          </tr>
        </thead>
        <tbody>
          {Engine.issuedInstuctions
            .concat(Engine.instructionQueue)
            .map((inst, i) => (
              <tr key={i}>
                <td>{inst.String}</td>
                <td>{inst.cycleIssued}</td>
                <td>{inst.cycleStarted}</td>
                <td>{inst.cycleFinish}</td>
                <td>{inst.cycleWb}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default InstructionQueue;
