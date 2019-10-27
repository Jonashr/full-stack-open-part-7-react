import React from 'react'
import { Form, Input } from 'semantic-ui-react'

const CommentForm = ({ handleSubmit, comment, blog }) => {
  return(
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Comment</label>
          <Input id='comment' {...comment} />
        </Form.Field>
        <button id='create' value={blog.id} type='submit'>Submit</button>
      </Form>
    </div>)


}


export default CommentForm