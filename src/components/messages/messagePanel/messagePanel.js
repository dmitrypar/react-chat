// general view and logic messagePanel
import React from "react";
import "./messagePanel.css";
import HeaderMessagePanel from "./../messageHeader/headerMessagePanel";
import MessageSendPanel from "./../messageSendPanel/messageSendPanel";
import DisplayMessagePanel from "./../messageDisplay/displayMessagePanel";
import firebase from "./../../../components/firebase/firebase";
import { setLoadedMessage } from "./../../../actions/index";
import { connect } from "react-redux";

class MessagePanel extends React.Component {
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
    const { currentUser, message } = this.state;
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

  // message template
  createdMessage = () => {
    const { currentUser } = this.state;
    const Message = {
      message: this.state.message,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
    };
    return Message;
  };

  // writes message data in database
  sendInputMessage = () => {
    const { message, messageRef } = this.state;
    const { currentChannel } = this.props;
    if (message) {
      this.setState({ loading: true });
      messageRef
        .child(currentChannel.id)
        .push()
        .set(this.createdMessage())
        .then(() => {
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

  // temlate message for update
  updateMessage = () => {
    const { currentUser } = this.state;
    const Message = {
      message: this.state.updatedMessage,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
    };
    return Message;
  };

  // writes update message in database
  onInputMessageSent = (editMessageId) => {
    const { messageRef } = this.state;
    const { currentChannel } = this.props;
    messageRef
      .child(currentChannel.id)
      .child(editMessageId)
      .update(this.updateMessage())
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
    const { messageRef } = this.state;
    const { currentChannel } = this.props;
    messageRef
      .child(currentChannel.id)
      .child(deleteMessageId)
      .remove()
      .then(() => {
        this.addLiseners(currentChannel.id);
      });
  };

  render() {
    return (
      <div className="container sendPanelContainer">
        <div className="row rowDisplayPanel">
          <HeaderMessagePanel />
        </div>
        <div className="row displayMain">
          {/* {this.props.loadedMessages.map((m)=> m.message)} */}
          <DisplayMessagePanel
            messages={this.props.loadedMessages}
            onBlurmessage={this.onBlurmessage}
            currentUser={this.props.currentUser}
            onEditCliked={this.onEditCliked}
            onInputMessageSent={this.onInputMessageSent}
            onMessageUpdateChange={this.onMessageUpdateChange}
            deleteMessage={this.deleteMessage}
          />
        </div>
        <div className="row">
          <MessageSendPanel
            message={this.state.message}
            loading={this.state.loding}
            inputMessageFromPanel={this.inputMessageFromPanel}
            sendInputMessage={this.sendInputMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadedMessages: state.messages.loadedMessages,
  isMessageLoading: state.messages.messagesLoading,
});

export default connect(mapStateToProps, { setLoadedMessage })(MessagePanel);
