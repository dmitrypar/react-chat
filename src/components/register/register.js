import React from "react";
import "./register.css";
import firebase from "./../firebase/firebase";
import { auth } from "firebase";

class Register extends React.Component {
  state = {
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err);
    })
  };

  render() {
    return (
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please sign up for Enter </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="user_name"
                          id="user_name"
                          className="form-control input-sm"
                          placeholder="User Name"
                          onChange={this.inputHandler}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control input-sm"
                      placeholder="Email Address"
                      onChange={this.inputHandler}
                    />
                  </div>

                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control input-sm"
                          placeholder="Password"
                          onChange={this.inputHandler}
                        />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          name="password_confirmation"
                          id="password_confirmation"
                          className="form-control input-sm"
                          placeholder="Confirm Password"
                          onChange={this.inputHandler}
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-info btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register
