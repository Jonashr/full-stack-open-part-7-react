import React from'react'
import Togglable from './Togglable'
import CommentForm from './CommentForm'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const blog = props.blogs.find(bl => props.blogid === bl.id)

  if(blog === undefined) {
    return null
  }

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <div>{blog.url}</div>
      <div>{blog.likes} likes<button onClick={() => props.likeBlog(blog, blog.id)} value={blog.id}>like</button></div>
      {blog.user !== undefined && blog.user.name !== undefined &&
            <div>{blog.user.name}</div>
      }
      {blog.user !== undefined && blog.user.username === props.user.username &&
        <div><button onClick={() => props.deleteBlog(blog.id).then(props.setNotification({ message: `Blog titled ${blog.title} was removed`, type: 'notification' }, 5000)).then(props.history.push('/'))}>delete</button></div>
      }
      <div>
        <br />
        <h2>Comments</h2>
        <Togglable buttonLabel='Add comment'>
          <CommentForm
            handleSubmit={props.addComment}
            comment={props.newComment}
            blog={blog}
          />
        </Togglable>
        {blog.comments.map((comment, index) => <div key={index}>{comment}</div>)}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('Blog state', state)
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog, deleteBlog, setNotification
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))