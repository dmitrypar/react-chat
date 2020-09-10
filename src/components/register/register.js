// register form
import React from "react";
import "./register.css";
import firebase from "./../firebase/firebase";
import md5 from "md5";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
    loadingData: false,
    dataBaseRef: firebase.database().ref("users"),
  };

  inputHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // validation in register form
  isValidForm = () => {
    let errors = [];
    let error;
    if (
      !this.state.user_name.length ||
      !this.state.email.length ||
      !this.state.password.length ||
      !this.state.password_confirmation.length
    ) {
      error = { message: "write text in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (
      this.state.password.length < 6 ||
      this.state.password_confirmation.length < 6 ||
      this.state.password.length !== this.state.password_confirmation.length
    ) {
      error = { message: "password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else return true;
  };

  // creats user data and writes in database
  onHandleSubmit = (e) => {
    e.preventDefault();
    if (this.isValidForm()) {
      this.setState({ loadingData: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.user_name,
              photoURL: `https://api.adorable.io/avatars/100/${md5(
                this.state.email
              )}`,
            })
            .then(() => {
              this.state.dataBaseRef.child(createdUser.user.uid).set({
                username: createdUser.user.displayName,
                profile_picture: createdUser.user.photoURL,
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                loadingData: false,
                errors: this.state.errors.concat(err),
              });
            });
          this.setState({ loadingData: false });
        })
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
    let {
      user_name,
      email,
      password,
      password_confirmation,
      errors,
      loadingData,
    } = this.state;

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
                          value={user_name}
                        />
                      </div>
                    </div>
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
                    <div className="col-xs-6 col-sm-6 col-md-6">
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
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          name="password_confirmation"
                          id="password_confirmation"
                          className={inputErrorIndicator(errors, "password")}
                          placeholder="Confirm Password"
                          onChange={this.inputHandler}
                          value={password_confirmation}
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Register"
                    disabled={loadingData}
                    className="btn btn-info btn-block"
                  />
                  <div className={"checkloginOrregister"}>
                    Already register? Please <Link to={"/login"}>login</Link>
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

export default Register;
