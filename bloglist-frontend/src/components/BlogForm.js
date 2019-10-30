import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'
import { addBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {

  const handleSub = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    props.addBlog(blog)
    props.resetTitle()
    props.resetAuthor()
    props.resetUrl()
    props.setNotification({ message: `Blog with title ${blog.title} was added`, type: 'notification' } , 5000)
  }

  return(
    <div>
      <Form onSubmit={handleSub}>
        <Form.Field>
          <label>Title</label>
          <Input name='title' id='title' {...props.title} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <Input name='author' id='author' {...props.author} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <Input name='url' id='url' {...props.url} />
        </Form.Field>
        <Button id='create' type='submit'>Create</Button>
      </Form>
    </div>)
}

const mapDispatchToProps = {
  addBlog, setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)