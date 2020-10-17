import React from "react";
import "./../sass/main.scss";
import UserPanelContainer from "../components/colorpanel/userPanel/userPanelContainer";
import { connect } from "react-redux";
import ChannelsContainer from "../components/colorpanel/channels/channelsContainer";
import { setDisplayChannelList } from "../redux/actions/index";
import MessagePanelContainer from "../components/messages/messagePanel/messagePanelContainer";

function App(props) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4 colorPanel toFullHeight ">
            <div className="userPanelGroup ">
              <UserPanelContainer currentUser={props.currentUser} />
              <ChannelsContainer
                currentUser={props.currentUser}
                setDisplayChannelList={props.setDisplayChannelList}
              />
            </div>
          </div>
          <div className="col-8 sendMessageMain">
            <MessagePanelContainer
              currentChannel={props.currentChannel}
              currentUser={props.currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channels.currentChannel,
});

export default connect(mapStatetoProps, { setDisplayChannelList })(App);
