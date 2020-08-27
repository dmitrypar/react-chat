import * as actionTypes from './types'

// users actions

export const setUser = (user) => {
return {
    type: actionTypes.SET_USER,
    payload: {
        currentUser: user
    }
}
}

export const outUser = (user) => {
    return {
        type: actionTypes.OUT_USER,
       
    }
    }

    // channels actions


    export const setDisplayChannelList = (displayChannelList) => {
        return {
            type: actionTypes.SET_CHANNELS_LIST,
            payload: {
                currentChannelsList: displayChannelList
            }
        }
        }

        export const setCurrentChannel = (currentChannel) => {
            return {
                type: actionTypes.SET_CURRENT_CHANNEL,
                payload: {
                    currentChannel: currentChannel
                }
            }
            }
    