// general view and logic messagePanel
import React from "react";
import MessagePanel from "./messagePanel";
import firebase from "../../../firebase/firebase";
import { setLoadedMessage } from "../../../redux/actions/index";
import { connect } from "react-redux";
import { firebaseAPI } from "./../../../API/firebaseAPI";

class MessagePanelContainer extends React.Component {
  state = {
    messageRef: firebase.database().ref("message"),
    message: "",
    currentChannel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    loading: false,
    errors: [],
    loadedMessage: this.props.loadedMessages,
    isMessageLoading: this.props.isMessageLoading,
    updatedMessage: "",
  };

  componentDidUpdate() {
    const { message, currentUser } = this.state;
    const { currentChannel } = this.props;
    if (
      currentChannel &&
      currentUser &&
      !message &&
      this.props.isMessageLoading
    ) {
      // set messages data from server
      this.addLiseners(currentChannel.id);
    }
  }

  addLiseners = (channelId) => {
    this.addMessageLiseners(channelId);
  };

  // reads  field 'messages' in firebase database and set this data in state
  addMessageLiseners = (channelId) => {
    const { messageRef } = this.state;
    const loadedMessage = [];
    messageRef.child(channelId).on("child_added", (data) => {
      loadedMessage.push({ serverMessageKey: data.key, data: data.val() });
      this.setState({ loadedMessage: loadedMessage, isMessageLoading: false });
      this.props.setLoadedMessage(loadedMessage);
    });
  };

  //set in state data from input field
  inputMessageFromPanel = (inputMessage) => {
    this.setState({ message: inputMessage });
  };

  // writes message data in database
  sendInputMessage = () => {
    const { message } = this.state;
    const { currentChannel, currentUser } = this.props;

    if (message) {
      this.setState({ loading: true });
      firebaseAPI.messageApi
        .createNewMessageApi(message, currentUser, currentChannel)
        .then(() => {
          console.log("sendInputMessage");
          this.setState({ message: "", loading: false, errors: [] });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat("please add message to input"),
      });
    }
  };

  // set in state message value from updatemessage field
  onMessageUpdateChange = (updatedMessage) => {
    this.setState({ updatedMessage: updatedMessage });
  };

  // writes update message in database
  onInputMessageSent = (editMessageId) => {
    const { updatedMessage } = this.state;
    const { currentChannel, currentUser } = this.props;
    firebaseAPI.messageApi
      .updateMessageOnEditButtonClicked(
        currentChannel,
        editMessageId,
        updatedMessage,
        currentUser
      )
      .then(() => {
        this.setState({
          messageTransformToForm: false,
        });
      })
      .then(() => {
        // reads update message from database
        this.addLiseners(currentChannel.id);
      });
  };

  // delete message from database
  deleteMessage = (deleteMessageId) => {
    const { currentChannel } = this.props;
    firebaseAPI.messageApi
      .deleteMessageFromDatabase(currentChannel, deleteMessageId)
      .then(() => {
        this.addLiseners(currentChannel.id);
      });
  };

  render() {
    return (
      <MessagePanel
        loadedMessages={this.props.loadedMessages}
        currentUser={this.props.currentUser}
        onInputMessageSent={this.onInputMessageSent}
        onMessageUpdateChange={this.onMessageUpdateChange}
        deleteMessage={this.deleteMessage}
        inputMessageFromPanel={this.inputMessageFromPanel}
        sendInputMessage={this.sendInputMessage}
        message={this.state.message}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loadedMessages: state.messages.loadedMessages,
  isMessageLoading: state.messages.messagesLoading,
});

export default connect(mapStateToProps, { setLoadedMessage })(
  MessagePanelContainer
);
