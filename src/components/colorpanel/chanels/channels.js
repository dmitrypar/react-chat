import React from "react";
import "./channels.css";
import Modal from "./../../modalWindow/modal";
import { connect} from 'react-redux'
//import {setDisplayChannelList} from './../../../actions/index';

class Channels extends React.Component {
  state = {
    dislayedChannels: [],
    selectedchannel: ''
  };

  handleModal = (props) => {
    console.log("handleModal");
    return;
  };

  componentDidMount=()=>{
    this.props.setDisplayChannelList()
    this.setState({
      dislayedChannels: this.props.channelsList
      
    })

  }

  dropdownMenuItemSelector = (channel) =>{
this.setState({selectedchannel: channel.id})
  }

  render() {

    return (
      <div style={{display:'flex', flexDirection: 'row'}}>
        <button
          type="button"
          className="btn btn-primary addChannel"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{ marginTop: "10px" }}
        >
          &#43;
        </button>

        <Modal currentUser={this.props.currentUser}
        setDisplayChannelList={this.props.setDisplayChannelList}/>
        <div className="dropdown" style={{ marginTop: "10px" }}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={()=>this.props.setDisplayChannelList(this.state.dislayedChannels)}
          >
            CHANNELS {this.state.dislayedChannels.length}
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      
           {this.state.dislayedChannels.map((channel)=>{
             return <div 
             key = {channel.id} 
             className={`dropdown-item ${channel.id===this.state.selectedchannel?'selected':''}`} 
             href="#"
             onClick={()=>this.dropdownMenuItemSelector(channel)}>{channel.name}</div>
           })}
 
          </div>
        </div>
      </div>
    );
  }
}

 const mapStateToProps=(state)=>({
  channelsList: state.channels.currentChannelsList
  })

export default connect(mapStateToProps, {} )(Channels);
