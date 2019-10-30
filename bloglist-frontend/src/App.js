import React, { useEffect } from 'react'
import blogsService from './services/blogs'
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
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'

const App = ({ initializeBlogs, initializeUsers, logout, blogs, users, login }) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const [comment, resetComment] = useField('text')

  useEffect(() => {
    console.log('App props')
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    console.log('Initialize users...')
    initializeUsers()
    if(login.user !== null) {
      blogsService.setToken(login.user.token)
    }
  }, [initializeUsers])

  const handleNewComment = async (event) => {
    event.preventDefault()
    const blogId = event.target.children[1].value
    const searchedBlog = blogs.find(b => b.id === blogId)
    searchedBlog.comments = searchedBlog.comments.concat(comment.value)
    await blogsService.createComment(searchedBlog, blogId)
    resetComment()
  }

  if(login.user === null) {
    return(
      <div>
        <Notification  />
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            resetPassword={resetPassword}
            resetUsername={resetUsername} />
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
              <Menu.Item link>
                <Link to='/users'>users</Link>
              </Menu.Item>
              <Menu.Item >
                <em>{login.user.name} is currently logged in</em>
                <Button onClick={() => logout()}>logout</Button>
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
              blog={blogs.find(blog => blog.id === match.params.id)}
              blogid={match.params.id}
              addComment={handleNewComment}
              newComment={comment}
              user={login.user} />
          } />
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={users.users.find(user => user.id === match.params.id)} />
          } />
        </Router>
      </div>
    )
}


const mapDispatchToProps = {
  initializeBlogs, initializeUsers, logout
}

const mapStateToProps = (state) => {
  console.log('Map state to props in app', state)
  return {
    blogs: state.blogs,
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
