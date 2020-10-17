import firebase from "./../firebase/firebase";

export const firebaseAPI = {
  // creates user data and writes in database (registerContainer)
  createUseronServerApi(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },

  updateProfileByAvatarandDisplayname(createdUser, user_name) {
    const photoURL = `https://avatars.dicebear.com/api/bottts/${user_name}.svg?mood[]=happy`;
    const dataBaseRef = firebase.database().ref("users");
    return createdUser.user
      .updateProfile({
        displayName: user_name,
        photoURL: photoURL,
      })
      .then(() => {
        dataBaseRef.child(createdUser.user.uid).set({
          username: createdUser.user.displayName,
          profile_picture: createdUser.user.photoURL,
        });
      });
  },

  // user autorisation (loginContainer)
  loginUserWithMailandPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  // create and writes new channel data in database (modalContainer)
  createChannelApi(channelName, channelDescription, user) {
    const channelRef = firebase.database().ref("channels");
    const key = channelRef.push().key;
    // new channel template
    const newChannel = {
      id: key,
      name: channelName,
      description: channelDescription,
      created: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    return channelRef.child(key).update(newChannel);
  },

  messageApi: {
    //(messagePanelContainer)

    messageRef: firebase.database().ref("message"),
    // create new message  in database
    createNewMessageApi(message, currentUser, currentChannel) {
      // message template
      const Message = {
        message: message,
        user: {
          id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
      };

      return this.messageRef.child(currentChannel.id).push().set(Message);
    },

    // writes updated message in database
    updateMessageOnEditButtonClicked(
      currentChannel,
      editMessageId,
      updatedMessage,
      currentUser
    ) {
      const messageToUpdate = {
        message: updatedMessage,
        user: {
          id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
      };
      return this.messageRef
        .child(currentChannel.id)
        .child(editMessageId)
        .update(messageToUpdate);
    },

    // delete message from database
    deleteMessageFromDatabase(currentChannel, deleteMessageId) {
      return this.messageRef
        .child(currentChannel.id)
        .child(deleteMessageId)
        .remove();
    },
  },
};
