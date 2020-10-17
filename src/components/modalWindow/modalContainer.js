// modal window for new channel creating
import React from "react";
import Modal from './modal'
import {firebaseAPI} from './../../API/firebaseAPI'

class ModalContainer extends React.Component {
  state = {
    user: this.props.currentUser,
    channelName: "",
    channelDescription: "",
    dislayedChannels: [],
  };

  // set input channel data in state
  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validData = ({ channelName, channelDescription }) =>
    channelName && channelDescription;

  // create and writes new channel data in database
  newChannelCreate = () => {
    const { channelName, channelDescription,  user } = this.state;
    firebaseAPI.createChannelApi(channelName, channelDescription, user)
      .then(() => {
        this.setState({
          channelName: "",
          channelDescription: "",
        });
      });
  };

  // create new channel
  submitHandler = (e) => {
    e.preventDefault();
    if (this.validData(this.state)) {
      this.newChannelCreate();
    }
  };

  render() {
    return (
      <Modal
      submitHandler={this.submitHandler}
      inputHandler={this.inputHandler}
      setDisplayChannelList={this.props.setDisplayChannelList}
      dislayedChannels={this.state.dislayedChannels}
      />
    )
  }
}

export default ModalContainer;
