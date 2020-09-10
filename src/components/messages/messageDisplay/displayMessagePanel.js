// displays message field
import React from "react";
import "./displayMessagePanel.css";
import MessageBody from "./../messageBody/messageBody";

const DisplayMessagePanel = (props) => {
  const { messages } = props;

  const messageToBody = (messages) =>
    messages.map((message) => (
      <MessageBody
        key={message.serverMessageKey}
        messages={message}
        currentUser={props.currentUser}
        onEditCliked={props.onEditCliked}
        onInputMessageSent={props.onInputMessageSent}
        onMessageUpdateChange={props.onMessageUpdateChange}
        deleteMessage={props.deleteMessage}
      />
    ));
  return (
    <div className="container displayPanel">
      <div className="row ">
        <div className="col displayMain">{messageToBody(messages)}</div>
      </div>
    </div>
  );
};
export default DisplayMessagePanel;
