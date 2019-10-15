import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Input } from 'semantic-ui-react'

const LoginForm = ({ handleLogin, username,password }) => {
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleLogin} >
        <Form.Field placeholder='Username' >
          <Icon name='user'><label>Username</label></Icon>
          <Input id='username' placeholder='username' {...username} />
        </Form.Field>
        <Form.Field>
          <Icon name='lock'><label>Password</label></Icon>
          <Input id='password' placeholder='password' {...password} />
        </Form.Field>
        <Button type='submit'>login</Button>
      </Form>
    </div>)
}

LoginForm.propTypes = {
  handleLogin:PropTypes.func.isRequired,
}

export default LoginForm