import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if(props.notification.message === '') {
    return null
  }

  const notificationStyling = {
    color: props.notification.type === 'error' ? 'red' : 'green',
    fontStyle: 'italic',
    fontSize: 25,
    borderStyle: 'solid',
    borderRadius: 5
  }

  return(
    <div style={notificationStyling}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)