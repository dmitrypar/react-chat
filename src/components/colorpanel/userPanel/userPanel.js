import React from "react";
import firebase from './../../firebase/firebase'

class UserPanel extends React.Component {
  state = {};
  hanleOnClickOut=()=>{
    firebase
    .auth()
    .signOut()
  
  }
  render() {
    
    const {currentUser}=this.props
    //const currentUserRender =[]
    //console.log(currentUser);
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img style={{width: '25px', marginRight: '5px', borderRadius:'8px'}} src={currentUser&&currentUser.photoURL} alt='avatar'/>
          {currentUser&&currentUser.displayName}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div className="dropdown-item" >
            Вошел как  {currentUser&&currentUser.displayName} 
          </div>
          <div className="dropdown-item">
            Сменить аватар
          </div>
          <div className="dropdown-item"  onClick={this.hanleOnClickOut}>
            Выйти
          </div>
        </div>
      </div>
    );
  }
}

export default UserPanel;
