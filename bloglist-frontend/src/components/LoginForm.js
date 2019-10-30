import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Input } from 'semantic-ui-react'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { connect } from 'react-redux'

const LoginForm = (props) => {
  const handleSub = async (event) => {
    event.preventDefault()
    console.log('Handle subimt in login form')
    try {
      const user = {
        username: event.target.username.value,
        password: event.target.password.value,
      }
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(loggedUser.data)
      )
      blogService.setToken(loggedUser.token)

      props.login(loggedUser.data)
      props.resetPassword()
      props.resetUsername()
    } catch(error) {
      console.log('Log exception..', error, error.message, error.response)
      props.setNotification({ message: 'Wrong password or username', type: 'error' }, 5000)
    }

  }

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSub} >
        <Form.Field placeholder='Username' >
          <Icon name='user'><label>Username</label></Icon>
          <Input id='username' placeholder='username' {...props.username} />
        </Form.Field>
        <Form.Field>
          <Icon name='lock'><label>Password</label></Icon>
          <Input id='password' placeholder='password' {...props.password} />
        </Form.Field>
        <Button type='submit'>login</Button>
      </Form>
    </div>)
}

LoginForm.propTypes = {
  handleLogin:PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  login, setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)