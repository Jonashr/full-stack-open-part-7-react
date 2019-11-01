const user = window.localStorage.getItem('loggedInUser')

const loggedInUser = user !== null ? JSON.parse(user) : null

const initialState = { user: loggedInUser }

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'LOGIN': {
    return action.data
  }
  case 'LOGOUT': {
    return action.data
  }
  default: {
    return state
  }
  }
}

export const login = (loggedUser) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: {
        user: loggedUser
      }
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedInUser')
  return{
    type: 'LOGOUT',
    data: {
      user: null
    }
  }

}

export default reducer