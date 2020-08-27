import React from "react";
import "./messagePanel.css";
import HeaderMessagePanel from "./../messageHeader/headerMessagePanel";
import MessageSendPanel from "./../messageSendPanel/messageSendPanel";
import DisplayMessagePanel from "./../messageDisplay/displayMessagePanel";
import firebase from "./../../../components/firebase/firebase";

class MessagePanel extends React.Component {
  state = {
    messageRef: firebase.database().ref("message"),
    message: "",
    //dont writed in state
    currentChannel: this.props.currentChannel,
    currentUser: this.props.currentUser,
    loading: false,
    errors: [],
  };

  componentDidMount(){
    const { currentUser} = this.state
    const {currentChannel} = this.props
    console.log('componentDidMount')
  

    
    if(currentChannel&&currentUser)
    {
      console.log('addLiseners')
      this.addLiseners(currentChannel.id)
    }
  }

  addLiseners=(channelId)=>{
this.addMessageLiseners(channelId)
  }

  addMessageLiseners=(channelId)=>{
    const {messageRef} = this.state
    const loadedMessage = []
    messageRef
    .child(channelId)
    .on('child_added', data=>{
      loadedMessage.push(data.val())
      console.log(loadedMessage);
    })

  }

  inputMessageFromPanel = (inputMessage) => {
    this.setState({ message: inputMessage });
  };

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

  sendInputMessage = () => {
    const { message, messageRef } = this.state;
    const { currentChannel } = this.props;
    //console.log(this.props.currentChannel);
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <HeaderMessagePanel />
        </div>
        <div className="row displayMain">
          <DisplayMessagePanel />
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

export default MessagePanel;
