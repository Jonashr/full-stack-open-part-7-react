import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import usersService from './services/users'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [comment, resetComment] = useField('text')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log('App props', props)
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    usersService
      .getAll()
      .then(response =>
        setUsers(response))
  }, [])

  console.log('State in app..', props)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    console.log('Logged user JSON', loggedUserJSON)

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('User ...', user)
      blogsService.setToken(user.data.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      resetPassword()
      resetUsername()
    }
    catch(exception) {
      console.log('Exception caught in handle login: ', exception)
      setNotification('Wrong password or username', 'error', 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    password.reset()
    console.log('Handle logout, password has the values', password)
    console.log('Handle logout, username', username)
    setUser(null)
  }

  const handleNewComment = async (event) => {
    event.preventDefault()
    const blogId = event.target.children[1].value
    const searchedBlog = props.blogs.find(b => b.id === blogId)
    searchedBlog.comments = searchedBlog.comments.concat(comment.value)
    await blogsService.createComment(searchedBlog, blogId)
    resetComment()
  }

  if(user === null) {
    return(
      <div>
        <Notification  />
        <Togglable buttonLabel='Login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password} />
        </Togglable>
      </div>)
  } else
    return (
      <div>
        <Router>
          <div>
            <Menu color="blue" inverted>
              <Menu.Item link>
                <Link to='/'>blogs</Link>
              </Menu.Item>
              <Menu.Item users>
                <Link to='/users'>users</Link>
              </Menu.Item>
              <Menu.Item content>
                <em>{user.data.name} is currently logged in</em>
                <Button onClick={() => handleLogout()}>logout</Button>
              </Menu.Item>
            </Menu>
          </div>
          <h2>Blog app</h2>
          <Notification />
          <Route exact path="/" render={() =>
            <div>
              <h2>Create a new blog</h2>
              <Togglable buttonLabel='New form'>
                <BlogForm
                  title={title}
                  author={author}
                  url={url}
                  resetTitle={resetTitle}
                  resetAuthor={resetAuthor}
                  resetUrl={resetUrl} />
              </Togglable>
              <Blogs />
            </div>
          }/>
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog
              blog={props.blogs.find(blog => blog.id === match.params.id)} 
              blogid={match.params.id}
              addComment={handleNewComment} 
              newComment={comment} 
              user={user} />
          } />
          <Route exact path="/users">
            <Users users={users} />
          </Route>
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={users.find(user => user.id === match.params.id)} />
          } />
        </Router>
      </div>
    )
}


const mapDispatchToProps = {
  setNotification, initializeBlogs
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
