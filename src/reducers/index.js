import * as actionTypes from "./../actions/types";
import {combineReducers} from 'redux'


const initionalUserState = {
    currentUser: null,
    loading: true,
}

const users_reducer = (state = initionalUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        loading: false,
      };
      case actionTypes.OUT_USER:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
};


const initionalChannelsState = {
  currentChannelsList: null,
  loading: true,
  currentChannel: ''
}

const channels_reducer = (state = initionalChannelsState, action) => {
switch (action.type) {
  case actionTypes.SET_CHANNELS_LIST:
    return {
      ...state,
      currentChannelsList: action.payload.currentChannelsList,
      loading: false,
    };
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
        loading: false,
      };
  
    
  default:
    return state;
}
};

const initionalMessagesState = {
  loadedMessages: [],
  messagesLoading: true,
  
}

const messages_reducer = (state = initionalMessagesState, action) => {
switch (action.type) {
  case actionTypes.SET_LOADED_MESSAGE:
    return {
      ...state,
      loadedMessages: action.payload.loadedMessages,
      messagesLoading: false,
    };
    case actionTypes.RESET_LOADING_MESSAGE:
      return {
        ...state,
        loadedMessages: [],
        messagesLoading: true,
      };

    
    
  default:
    return state;
}
};


//

const RootReducer = combineReducers({

    user: users_reducer,
    channels: channels_reducer,
    messages: messages_reducer
   
})

export default RootReducer