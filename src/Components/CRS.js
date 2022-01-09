import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const CRS = ({ type,name}) => {
  //console.log("stationss = ", Engine.allStations);
  if(Engine.allStations === undefined) {return(
    <h1>error</h1>
  )}
  else{
  return (
    <>
    <h2 className="text-center my-3">Reservation Station {name}</h2>
      <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive col-10 offset-1">
      {/* <h4>statsions {JSON.stringify(Engine.allStations[type].stations[0])}</h4>  */}

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
                  {Engine.allStations[type].stations.map((rs, i) => (
              <tr key={i}>
                <td>{rs.tag}</td>
                <td>{rs.op}</td> 
                <td>{rs.v1}</td>
                <td>{rs.v2}</td>
                <td>{rs.q1}</td>
                <td>{rs.q2}</td>
                <td>{rs.veryBusy}</td>
                 <td>{rs.execTime}</td>
              </tr>
            ))}     
          </tbody>
        </table>
      </div>
    </>
  );
};}

export default CRS;
