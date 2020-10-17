import React from "react";
import firebase from "../../../firebase/firebase";
import UserPanel from "./userPanel";

const UserPanelContainer = ({ currentUser }) => {
  //logout user
  const hanleOnClickOut = () => {
    firebase.auth().signOut();
  };

  const { photoURL, displayName } = currentUser;

  return (
    <UserPanel
      photoURL={photoURL}
      displayName={displayName}
      hanleOnClickOut={hanleOnClickOut}
    />
  );
};

export default UserPanelContainer;
