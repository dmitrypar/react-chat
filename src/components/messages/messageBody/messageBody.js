// general message view
import React, { useState } from "react";
import "./messageBody.css";
import moment from "moment";

const MessageBody = (props) => {
  const [isOnFocusmessage, setIsOnFocusmessage] = useState(false);
  const [messageTransformToForm, setMessageTransformToForm] = useState(false);

  const { timeStamp, user, message } = props.messages.data;

  //  time label in message
  const time = () => {
    return moment(timeStamp).fromNow();
  };

  const onSendButtonClick = () => {
    // send updated(edited) message on click send button
    props.onInputMessageSent(props.messages.serverMessageKey);
    //switch on trigger for text aria displayng
    setMessageTransformToForm(false);
  };

  // edit mode view with input text field
  const editToSent = () => {
    return (
      <span>
        <textarea
          defaultValue={message}
          onChange={(e) => props.onMessageUpdateChange(e.target.value)}
        />
        <button
          onClick={onSendButtonClick}
          className="md-auto  btn btn-primary  sentButtonButton"
        >
          <div className="sentButton">&#9993;</div>
        </button>
      </span>
    );
  };

  // additional view two button - 'edit' and 'delete'
  const edit = () => {
    return (
      !messageTransformToForm && (
        <span className="editMessageMode">
          <button
            onClick={() => onEditCliked(props.messages.serverMessageKey)}
            className="md-auto  btn btn-primary editButton"
          >
            {" "}
            &#9999;
          </button>
          <button
            onClick={() => props.deleteMessage(props.messages.serverMessageKey)}
            className="md-auto messageTime btn btn-danger"
          >
            {" "}
            <div className="deleteButton">&#215;</div>
          </button>
        </span>
      )
    );
  };

  //switch on trigger for 'edit' and 'delete' button displayng
  const onFocusmessage = () => {
    setIsOnFocusmessage(true);
  };

  //switch off trigger for 'edit' and 'delete' button displayng
  const onBlurmessage = () => {
    setIsOnFocusmessage(false);
  };

  //switch on trigger for text aria displayng
  const onEditCliked = (id) => {
    setMessageTransformToForm(true);
    console.log("id", id);
  };

  return (
    <div className="container">
      <div className="row rowMessage">
        <div className="md-auto user">
          <img src={user.avatar} alt="ava" />
        </div>
        <div className="md-auto message">
          <div
            className="container messageContainer"
            tabIndex={0}
            onDoubleClick={onFocusmessage}
            onClick={onBlurmessage}
          >
            <div className="col messageCol">
              <div className="messageUserName">{user.name}</div>
              {messageTransformToForm ? (
                editToSent()
              ) : (
                <div className="">{message}</div>
              )}
            </div>
          </div>
        </div>
        <div className="md-auto messageTime">{time()}</div>
        {isOnFocusmessage &&
          user.name === props.currentUser.displayName &&
          edit()}
      </div>
    </div>
  );
};
export default MessageBody;
