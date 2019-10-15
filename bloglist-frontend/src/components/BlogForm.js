import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'semantic-ui-react'

const BlogForm = ({ handleSubmit, title, author, url }) => {
  return(
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <Input {...title} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <Input {...author} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <Input {...url} />
        </Form.Field>
        <Button type='submit'>Create</Button>
      </Form>
    </div>)
}

BlogForm.propTypes = {
  handleSubmit:PropTypes.func.isRequired
}

export default BlogForm