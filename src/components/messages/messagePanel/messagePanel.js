import React from "react";
import HeaderMessagePanel from "../messageHeader/headerMessagePanel";
import DisplayMessagePanel from "../messageDisplay/displayMessagePanel";
import MessageSendPanel from "../messageSendPanel/messageSendPanel";

function MessagePanel({
  loadedMessages,
  currentUser,
  inputMessageFromPanel,
  sendInputMessage,
  onMessageUpdateChange,
  deleteMessage,
  onInputMessageSent,
  message
}) {
  return (
    <div className="container  sendPanelContainer">
      <div className="row-8 rowDisplayPanel">
        <HeaderMessagePanel />
      </div>
      <div className="row displayMain">
        <DisplayMessagePanel
          messages={loadedMessages}
          currentUser={currentUser}
          onInputMessageSent={onInputMessageSent}
          onMessageUpdateChange={onMessageUpdateChange}
          deleteMessage={deleteMessage}
        />
      </div>
      <div className="row-4 d-flex align-items-end">
        <MessageSendPanel
        message={message}
          inputMessageFromPanel={inputMessageFromPanel}
          sendInputMessage={sendInputMessage}
        />
      </div>
    </div>
  );
}

export default MessagePanel;
