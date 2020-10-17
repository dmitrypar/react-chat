import React from "react";
import ModalContainer from "../../modalWindow/modalContainer";

const Channels = ({
  dislayedChannels,
  currentUser,
  setDisplayChannelList,
  selectedchannelId,
  dropdownMenuItemSelector,
}) => {
  return (
    <div className="userColorBlock">
      <button
        type="button"
        className="btn btn-primary addChannel"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ marginTop: "10px" }}
      >
        &#43;
      </button>

      <ModalContainer
        dislayedChannels={dislayedChannels}
        currentUser={currentUser}
        setDisplayChannelList={setDisplayChannelList}
      />
      <div className="dropdown" style={{ marginTop: "10px" }}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          CHANNELS {dislayedChannels.length}
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {dislayedChannels.map((channel) => {
            return (
              <div
                key={channel.id}
                className={`dropdown-item ${
                  channel.id === selectedchannelId ? "selected" : ""
                }`}
                href="#"
                onClick={() => dropdownMenuItemSelector(channel)}
              >
                {channel.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Channels;
