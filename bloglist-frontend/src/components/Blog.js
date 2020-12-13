import React from'react'
import Togglable from './Togglable'
import CommentForm from './CommentForm'
import Notification from './Notification'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Typography, Container, Paper, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
    minHeight: '300px'
  },
  comments: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2)
  }
}))

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const authorizedUser = useSelector(state => state.authorizedUser)
  const classes = useStyles()

  if(!blog) {
    return null
  }

  const handleDeleteBlog = () => {
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification({ message: `Blog titled ${blog.title} was removed`, type: 'notification' }, 5000))
      history.push('/')
    } catch(error) {
      dispatch(setNotification({ message: 'Error occured when trying to remove the blog.', type: 'error' }, 5000))
    }
  }

  return (
    <Container maxWidth='sm'>
      <Paper className={classes.paper}>
        <Typography
          variant='h3'
          className={ classes.heading}>
          {blog.title}
        </Typography>
        <p>Author: { blog.author } </p>
        <p>Url: <a>{blog.url}</a></p>
        {blog.likes} likes
        <Button
          className={classes.button}
          onClick={() => dispatch(likeBlog(blog, blog.id))}
          value={blog.id}
          aria-label='Like'
          color="secondary"
          variant='contained'
          startIcon={<ThumbUpIcon/>}
        >
          Like
        </Button>
        {blog.user !== undefined && blog.user.username !== undefined &&
          <Typography variant="subtitle1">Posted By: {blog.user.username}</Typography>
        }
        {blog.user !== undefined && authorizedUser !== undefined && blog.user.username === authorizedUser.user.username &&
          <Button
            variant='contained'
            color='secondary'
            onClick={handleDeleteBlog}
            startIcon={<DeleteIcon />}
          >
          Delete
          </Button>
        }
        <div className={classes.comments}>
          <Typography variant='h5'>Comments</Typography>
          <Togglable buttonLabel='Add comment'>
            <CommentForm
              blog={blog}
            />
          </Togglable>
          <Notification />
          {blog.comments.map((comment, index) => <div className={ classes.comments } key={index}>{comment}</div>)}
        </div>
      </Paper>
    </Container>
  )
}

export default Blog