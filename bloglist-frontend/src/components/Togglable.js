import React, { useState } from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center',
    justifyContent: 'center'
  }
}))

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const classes = useStyles()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className={ classes.centered }>
      <div style={hideWhenVisible}  id='togglable'>
        <Button
          color="primary"
          variant="contained"
          style={{ marginTop: 10 }}
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={{ marginTop: 5 }}
          color="secondary"
          variant="contained"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable