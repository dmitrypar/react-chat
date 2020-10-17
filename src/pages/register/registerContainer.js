// register form
import React from "react";
import firebase from "../../firebase/firebase";
import { connect } from "react-redux";
import { setUser } from "../../redux/actions/index";
import Register from "./register";
import { firebaseAPI } from "./../../API/firebaseAPI";

class RegisterContainer extends React.Component {
  state = {
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: [],
    loadingData: false,
    dataBaseRef: firebase.database().ref("users"),
    isUpdateRegisterDataUserComplete: false,
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

  // creates user data and writes in database
  onHandleSubmit = (e) => {
    e.preventDefault();
    if (this.isValidForm()) {
      this.setState({ loadingData: true });
      firebaseAPI
        .createUseronServerApi(this.state.email, this.state.password)
        .then((createdUser) => {
          firebaseAPI
            .updateProfileByAvatarandDisplayname(
              createdUser,
              this.state.user_name
            )
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
      <Register
        user_name={user_name}
        email={email}
        password={password}
        password_confirmation={password_confirmation}
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
})(RegisterContainer);
