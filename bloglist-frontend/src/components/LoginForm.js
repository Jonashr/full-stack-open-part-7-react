import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { TextField , Typography, Button, Paper, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  paper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}))

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = {
        username,
        password,
      }

      const loggedUser = await loginService.login(user)

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)

      dispatch(login(loggedUser))
      dispatch(setNotification({ message: `${user.username} Succesfully logged in` }, 2500))
      setPassword('')
      setUsername('')
    } catch(error) {
      dispatch(setNotification({ message: 'Wrong password or username', type: 'error' }, 5000))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5" component="h1">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            required
            label="username"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder='Username'
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            required
            label="Password"
            fullWidth
            variant="outlined"
            id="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            color="secondary"
            type='submit'
            id="login"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>)
}



export default LoginForm