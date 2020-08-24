import React from "react";
import "./App.css";
import UserPanel from './../colorpanel/userPanel/userPanel'
import {connect} from 'react-redux'
import Channels from './../colorpanel/chanels/channels'
import {setDisplayChannelList} from './../../actions/index'
import MessagePanel from './../messages/messagePanel/messagePanel'


function App(props) {

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4 colorPanel">
            <UserPanel currentUser={props.currentUser}/>
           
            </div>
          <div className="col"><MessagePanel/></div>
        </div>
      </div>
      <div className="container">
      <div className="row">
          <div className="col-4 colorPanel toFullHeight">
          <Channels currentUser={props.currentUser}
          setDisplayChannelList={props.setDisplayChannelList}
          />
            </div>
          </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
currentUser:state.user.currentUser
})


export default connect(mapStatetoProps, {setDisplayChannelList})(App);
