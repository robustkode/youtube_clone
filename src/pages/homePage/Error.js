import "./error.scss";
export const Error = () => {
  return (
    <div className="quota-error gid items-center">
      <div className=" error_container p-4 rounded">
        <p>
          <span className="large">Sorry!</span> we run out of daily YouTube V3
          api API request quota.
        </p>
      </div>
    </div>
  );
};
