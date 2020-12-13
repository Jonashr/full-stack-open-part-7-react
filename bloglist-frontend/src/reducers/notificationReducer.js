const initialState = {
  message: '',
  type: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const setNotification = (notification, milliseconds) => {
  return async (dispatch) => {
    await dispatch( {
      type:'SET_NOTIFICATION',
      notification: {
        message: notification.message,
        type: notification.type
      }
    })

    await setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: {
          message: ''
        }
      })
    }, milliseconds)
  }
}

export default notificationReducer