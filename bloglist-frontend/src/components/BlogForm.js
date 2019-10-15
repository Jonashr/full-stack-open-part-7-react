import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'semantic-ui-react'

const BlogForm = ({ handleSubmit, title, author, url }) => {
  return(
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <Input id='title' {...title} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <Input id='author' {...author} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <Input id='url' {...url} />
        </Form.Field>
        <Button id='create' type='submit'>Create</Button>
      </Form>
    </div>)
}

BlogForm.propTypes = {
  handleSubmit:PropTypes.func.isRequired
}

export default BlogForm