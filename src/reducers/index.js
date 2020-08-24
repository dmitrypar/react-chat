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
}

const channels_reducer = (state = initionalChannelsState, action) => {
switch (action.type) {
  case actionTypes.SET_CHANNELS_LIST:
    return {
      ...state,
      currentChannelsList: action.payload.currentChannelsList,
      loading: false,
    };


  default:
    return state;
}
};





const RootReducer = combineReducers({

    user: users_reducer,
    channels: channels_reducer
})

export default RootReducer