import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const Memory = () => {
  //console.log("stationss = ", Engine.allStations);
  if(Engine.allStations === undefined) {return(
    <h1>error</h1>
  )}
  else{
  return (
    <>
    <h2>Memory</h2>
      <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive">

        <table className="table table-bordered table-striped mb-0">
          <thead>
            <tr>
              <th>Address</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {/* for (let [key, value] of map) */}
                   {Engine.memory.forEach((value, key)=> (
              <tr key={key}>
                <td>{key}</td>
                <td>{Engine.memory.get(key)}</td> 
              </tr>
            ))}     
          </tbody>
        </table>
      </div>
    </>
  );
};}

export default Memory;
