import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blogs = ({ blogs, handleLikeButton, handleDeleteButton, addComment, user }) => {
  return(
    <div>
      <Table striped celled>
        <Table.Body>
          {blogs.map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Blogs