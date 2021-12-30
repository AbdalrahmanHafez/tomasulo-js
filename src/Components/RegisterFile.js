import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../Engine/Engine.js";

const RegisterFile = ({ engine }) => {
  return (
    <>
      <div className="table-wrapper-scroll-y my-custom-scrollbar table-responsive">
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
