// login
import React from "react";
import Login from "./login";
import { firebaseAPI } from "./../../API/firebaseAPI";
import { setUser } from "../../redux/actions/index";
import { connect } from "react-redux";

class LoginContainer extends React.Component {
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
    const { email, password, errors } = this.state;
    e.preventDefault();

    if (email && password) {
      this.setState({ loadingData: true });
      firebaseAPI
        .loginUserWithMailandPassword(email, password)
        .then((loggedUser) => {
          this.props.setUser(loggedUser);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loadingData: false,
            errors: errors.concat(err),
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
      <Login
        email={email}
        password={password}
        errors={errors}
        loadingData={loadingData}
        inputErrorIndicator={inputErrorIndicator}
        inputHandler={this.inputHandler}
        onHandleSubmit={this.onHandleSubmit}
      />
    );
  }
}

export default connect(null, {
  setUser,
})(LoginContainer);
