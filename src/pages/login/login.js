import React from "react";
import { Link } from "react-router-dom";

const Login = ({
  email,
  password,
  errors,
  loadingData,
  inputErrorIndicator,
  inputHandler,
  onHandleSubmit,
}) => {
  return (
    <div className="container">
      <div className="row centered-form">
        <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Please Login for Enter </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={onHandleSubmit}>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12"></div>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={inputErrorIndicator(errors, "email")}
                    placeholder="Email Address"
                    onChange={inputHandler}
                    value={email}
                  />
                </div>

                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={inputErrorIndicator(errors, "password")}
                        placeholder="Password"
                        onChange={inputHandler}
                        value={password}
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Login"
                  disabled={loadingData}
                  className="btn btn-info btn-block"
                />
                <div className={"checkloginOrregister"}>
                  Need to register? Please sign in{" "}
                  <Link to={"/register"}>register</Link>
                </div>

                <div className="form-group errorbox">
                  {errors.length > 0 && <div> Error </div>}
                  {errors.map((error, i) => (
                    <p key={i}>{error.message}</p>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
