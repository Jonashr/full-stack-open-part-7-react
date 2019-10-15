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
  Route, Link,
} from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const App = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState( { message: null, type: null })
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    blogsService
      .getAll()
      .then(response => {
        setBlogs(response.sort((a, b) => a.likes - b.likes).reverse())
      })
  }
  , [counter])

  useEffect(() => {
    usersService
      .getAll()
      .then(response =>
        setUsers(response))
  }, [])

  console.log('Users in App', users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    console.log('Logged user JSON', loggedUserJSON)

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('User ...', user)
      blogsService.setToken(user.data.token)
    }
  }, [counter])

  // This method is pretty much copy pasted from the exercise solution.

  const Notification = ({ notification }) => {
    if(notification.message === null) {
      return null
    }

    const notificationStyling = {
      color: notification.type === 'error' ? 'red' : 'green',
      fontStyle: 'italic',
      fontSize: 25,
      borderStyle: 'solid',
      borderRadius: 5
    }

    return(
      <div style={notificationStyling}>
        {notification.message}
      </div>
    )
  }

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      username.value = ''
      password.value = ''
      setCounter(counter + 1)
    }
    catch(exception) {
      console.log('Exception caught in handle login: ', exception)
      notify('Wrong password or username', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    password.reset()
    console.log('Handle logout, password has the values', password)
    console.log('Handle logout, username', username)
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1
    }

    try {
      const createdBlog = await blogsService.create(blog)
      setBlogs(blogs.concat(createdBlog))
    } catch(exception) {
      console.log('Exception in handle new blog', exception)
      notify(exception.toString(), 'error')
    }

  }

  const handleLikeButton = async (event) => {
    event.preventDefault()
    const blogId = event.target.value
    const searchedBlog = blogs.find(b => b.id === blogId)

    const newUpdatedBlog = {
      user: searchedBlog.user.id,
      likes: searchedBlog.likes + 1,
      title: searchedBlog.title,
      author: searchedBlog.author,
      url: searchedBlog.url
    }

    console.log(newUpdatedBlog)

    await blogsService.update(blogId, newUpdatedBlog)

    setBlogs(blogs.map(blog => blog.id !== blogId ? blog : newUpdatedBlog))

    setCounter(counter + 1)

  }

  const handleDeleteButton = async (event) => {
    event.preventDefault()
    if(window.confirm('Delete this blog ? ')) {
      const blogId = event.target.value
      const newBlogList = [...blogs]
      const indexOfDeletedBlog = blogs.findIndex(b => b.id === blogId)
      newBlogList.splice(indexOfDeletedBlog, 1)

      notify('Blog was removed from the notebook')

      await blogsService.deleteItem(blogId)
      setCounter(counter + 1)
      setBlogs(newBlogList)
    }


  }

  if(user === null) {
    return(
      <div>
        <Notification notification={notification} />
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
          <Notification notification={notification} />
          <Route exact path="/" render={() =>
            <div>
              <h2>Create a new blog</h2>
              <Togglable buttonLabel='New form'>
                <BlogForm
                  handleSubmit={handleNewBlog}
                  title={title}
                  author={author}
                  url={url} />
              </Togglable>
              <Blogs blogs={blogs} handleLikeButton={handleLikeButton} handleDeleteButton={handleDeleteButton} user={user} />
            </div>
          }/>
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogs.find(blog => blog.id === match.params.id)} handleLikeButton={handleLikeButton} user={user} />
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

export default App