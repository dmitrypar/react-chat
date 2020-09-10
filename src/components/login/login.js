// login
import React from "react";
import "./login.css";
import firebase from "./../firebase/firebase";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loadingData: false,
  };

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // user autorisation
  onHandleSubmit = (e) => {
    console.log(this.state.email && this.state.password);
    e.preventDefault();
    if (this.state.email && this.state.password) {
      this.setState({ loadingData: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((loggedUser) => {})
        .catch((err) => {
          console.log(err);
          this.setState({
            loadingData: false,
            errors: this.state.errors.concat(err),
          });
        });
    }
  };

  render() {
    let { email, password, errors, loadingData } = this.state;

    const inputErrorIndicator = (errors, inputNameField) => {
      return `form-control input-sm ${
        errors.some((error) =>
          error.message.toLowerCase().includes(inputNameField)
        )
          ? "error"
          : ""
      }`;
    };

    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please Login for Enter </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
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
                      onChange={this.inputHandler}
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
                          onChange={this.inputHandler}
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
  }
}

export default Login;
