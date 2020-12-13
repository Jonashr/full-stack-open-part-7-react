import React from 'react'
import { Alert }  from '@material-ui/lab'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(notification.message === '') {
    return null
  }

  return(
    <Alert severity={ notification.type === 'error' ? 'error' : 'success' }>
      {notification.message}
    </Alert>
  )
}


export default Notification