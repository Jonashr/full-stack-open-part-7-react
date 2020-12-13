import React, { useEffect } from 'react'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import { Container, Typography, AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  linkButton: {
    color: 'white',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    textAlign: 'center',
  },
  centered: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  topBottomMargin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  blogList: {
    textAlign: 'center',
    justifyContent: 'center'
  }
}))


const App = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const authorizedUser = useSelector(state => state.authorizedUser)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
    if(authorizedUser.user !== null) {
      blogsService.setToken(authorizedUser.user.token)
    }
  }, [dispatch, authorizedUser.user])

  if(authorizedUser.user === null) {
    return(
      <Container>
        <div>
          <Notification />
          <LoginForm />
        </div>
      </Container>
    )
  } else
    return (
      <Container>
        <div>
          <Router>
            <AppBar position="static">
              <Toolbar className={classes.flex}>
                <div>
                  <Button className={classes.linkButton} component={Link} to='/'>Blogs</Button>
                  <Button className={classes.linkButton} component={Link}  to='/users'>Users</Button>
                </div>
                <div>
                  Logged in as { authorizedUser.user.username } 
                  <Button
                    className={classes.linkButton}
                    variant='contained'
                    color='secondary'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
            <Notification />
            <Route exact path="/" render={() =>
              <div className={classes.topBottomMargin}>
                <Typography variant='h4' className={classes.header}>Create a new blog</Typography>
                <Togglable buttonLabel='New form'>
                  <BlogForm />
                </Togglable>
                <Blogs />
              </div>
            }/>
            <Route exact path='/blogs/:id' render={({ match }) =>
              <div className={classes.centered}>
                <Blog
                  blog={blogs.find(blog => blog.id === match.params.id)}
                />
              </div>
            } />
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={users.find(user => user.id === match.params.id)} />
            } />
          </Router>
        </div>
      </Container>
    )
}


export default App
