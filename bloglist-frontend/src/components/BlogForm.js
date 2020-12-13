import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Container, Button, TextField } from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlogPost = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    dispatch(addBlog(blog))
    setTitle('')
    setAuthor('')
    setUrl()
    dispatch(setNotification({ message: `Blog with title ${blog.title} was added`, type: 'notification' } , 5000))
  }

  return(
    <Container maxWidth="xs" >
      <form onSubmit={handleSubmitBlogPost}>
        <TextField
          fullWidth
          required
          label='Title'
          variant='outlined'
          placeholder='Title'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          fullWidth
          label='Author'
          variant='outlined'
          placeholder='Author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          fullWidth
          label='Url'
          variant='outlined'
          placeholder='url'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button
          variant='contained'
          fullWidth
          color='secondary'
          id='create'
          type='submit'>Create
        </Button>
      </form>
    </Container>)
}


export default BlogForm