// input field and sent button in bottom message panel
import React from "react";


const MessageSendPanel = (props) => {
  return (
<div className="container sendPanelContainer ">
  <div className="row ">
  <div className="input-group mb-3 col" style={{marginTop: '2em'}}>
      <input
        type="text"
        className="form-control"
        value={props.message}
        placeholder="Send Message"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        onChange={(event)=>props.inputMessageFromPanel(event.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" 
        type="button"
        disabled={props.loading}
        onClick={props.sendInputMessage}>
          Send
        </button>
      </div>
    </div>
  </div>
</div>
  );
};
export default MessageSendPanel;
