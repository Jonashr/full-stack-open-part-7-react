import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'

const Blogs = (props) => {
  if(props.blogs === undefined) {
    return null
  }

  console.log('Blogs', props.blogs)


  return(
    <div>
      <Table striped celled>
        <Table.Body>
          {props.blogs.map(blog =>
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blogs)