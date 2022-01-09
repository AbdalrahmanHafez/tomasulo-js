import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const GlobalInfo = () => {
  return (
    <>
      <h4 className="text-center mt-4">Cycle #{Engine.cycles-1}</h4>
      {/* <h4>statsions {JSON.stringify(Engine.allStations)}</h4> */}
    </>
  );
};

export default GlobalInfo;
