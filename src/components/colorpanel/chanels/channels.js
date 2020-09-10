// channels panel
import React from "react";
import "./channels.css";
import Modal from "./../../modalWindow/modal";
import { connect } from "react-redux";
import firebase from "./../../firebase/firebase";
import {
  setCurrentChannel,
  resettoloadedMessages,
} from "./../../../actions/index";

class Channels extends React.Component {
  state = {
    channelRef: firebase.database().ref("channels"),
    dislayedChannels: [],
    selectedchannelId: "",
    firstChannelload: true,
  };

  componentDidMount = () => {
    this.addLisener();
  };

  // reads channels list data from database and set in state
  addLisener = () => {
    let displayChannelList = [];
    this.state.channelRef.on("child_added", (data) => {
      displayChannelList.push(data.val());
      this.setState({ dislayedChannels: displayChannelList }, () =>
        this.loadFirstChannel()
      );
    });
    if (this.state.dislayedChannels.length > 0) {
      this.props.setDisplayChannelList(displayChannelList);
    }
  };

  // set first channel data
  loadFirstChannel = () => {
    const firstChannel = this.state.dislayedChannels[0];
    if (this.state.firstChannelload && this.state.dislayedChannels.length > 0) {
      this.props.setDisplayChannelList(firstChannel);
      this.dropdownMenuItemSelector(firstChannel);
    }
    this.setState({ firstChannelload: false });
  };

  dropdownMenuItemSelector = (channel) => {
    this.props.setCurrentChannel(channel);
    this.setState({ selectedchannelId: channel.id });
    this.props.resettoloadedMessages();
  };
  // remove Ref
  componentWillUnmount() {
    this.state.channelRef.off();
  }

  render() {
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

        <Modal
          dislayedChannels={this.state.dislayedChannels}
          currentUser={this.props.currentUser}
          setDisplayChannelList={this.props.setDisplayChannelList}
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
            CHANNELS {this.state.dislayedChannels.length}
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.dislayedChannels.map((channel) => {
              return (
                <div
                  key={channel.id}
                  className={`dropdown-item ${
                    channel.id === this.state.selectedchannelId
                      ? "selected"
                      : ""
                  }`}
                  href="#"
                  onClick={() => this.dropdownMenuItemSelector(channel)}
                >
                  {channel.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channelsList: state.channels.currentChannelsList,
});

export default connect(mapStateToProps, {
  setCurrentChannel,
  resettoloadedMessages,
})(Channels);
