import usersService from '../services/users'

const reducer = (state = [], action) => {
  console.log('User reducer logging', state, action)
  switch(action.type) {
  case 'INITIALIZE_USERS': {
    return action.data
  }
  default: {
    return state
  }
  }
}



export const initializeUsers = () => {

  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: {
        users,
      }
    })
  }
}


export default reducer