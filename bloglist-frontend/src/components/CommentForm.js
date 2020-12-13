import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Container, Button } from '@material-ui/core'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmitNewComment = async (event) => {
    event.preventDefault()

    const insertedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    try {
      dispatch(addComment(insertedBlog, blog.id))
      setComment('')
    } catch(error) {
      dispatch(setNotification({ message: 'Failed to add a new comment', type: 'notification' } , 5000))
    }
  }

  return(
    <Container maxWidth='xs'>
      <form onSubmit={handleSubmitNewComment}>
        <TextField
          fullWidth
          required
          label="Comment"
          color='primary'
          variant='outlined'
          placeholder="Write a comment here"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          value={blog.id}
          type='submit'
          id='login'
        >
          Create new comment
        </Button>
      </form>
    </Container>)


}


export default CommentForm