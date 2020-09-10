import React from "react";
import firebase from "./../../firebase/firebase";
import './userPanel.css'

const UserPanel = ({ currentUser }) => {

  //logout user
  const hanleOnClickOut = () => {
    firebase.auth().signOut();
  };

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
        <img
        className='avatar'
          src={currentUser && currentUser.photoURL}
          alt="avatar"
        />
        {currentUser && currentUser.displayName}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div className="dropdown-item">
          Вошел как {currentUser && currentUser.displayName}
        </div>
        <div className="dropdown-item" onClick={hanleOnClickOut}>
          Выйти
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
