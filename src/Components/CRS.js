import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const CRS = ({ type }) => {
  console.log("stationss = ", Engine.allStations);
  return (
    <>
      <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive">
        <table className="table table-bordered table-striped mb-0">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Op</th>
              <th>V1</th>
              <th>V2</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Busy</th>
              <th>Remining</th>
            </tr>
          </thead>
          <tbody>
            {/* {Engine.allStations[type].stations.map((rs, i) => (
              <tr key={i}>
                <td>{rs.tag}</td>
                <td>{rs.instruction.op}</td>
                <td>{rs.v1}</td>
                <td>{rs.v2}</td>
                <td>{rs.q1}</td>
                <td>{rs.q2}</td>
                <td>{rs.busy}</td>
                <td>{rs.instruction.execTime}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CRS;
