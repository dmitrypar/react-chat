// channels panel
import React from "react";
import Channels from "./channels";
import { connect } from "react-redux";
import firebase from "../../../firebase/firebase";
import {
  setCurrentChannel,
  resettoloadedMessages,
} from "../../../redux/actions/index";

class ChannelsContainer extends React.Component {
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
    const { dislayedChannels, selectedchannelId } = this.state;
    return (
      <Channels
        dislayedChannels={dislayedChannels}
        currentUser={this.props.currentUser}
        setDisplayChannelList={this.props.setDisplayChannelList}
        selectedchannelId={selectedchannelId}
        dropdownMenuItemSelector={this.dropdownMenuItemSelector}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  channelsList: state.channels.currentChannelsList,
});

export default connect(mapStateToProps, {
  setCurrentChannel,
  resettoloadedMessages,
})(ChannelsContainer);
