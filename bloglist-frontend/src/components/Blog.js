import React from'react'
import Togglable from './Togglable'
import CommentForm from './CommentForm'


const Blog = ({ blog, handleLikeButton, handleDeleteButton, user, addComment, newComment }) => {
  if(blog === undefined) {
    return null
  }

  console.log(blog.comments)

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <div>{blog.url}</div>
      <div>{blog.likes} likes<button onClick={handleLikeButton} value={blog.id}>like</button></div>
      {blog.user !== undefined && blog.user.name !== undefined &&
            <div>{blog.user.name}</div>
      }
      {blog.user !== undefined && blog.user.username === user.data.username &&
        <div><button onClick={handleDeleteButton} value={blog.id}>delete</button></div>
      }
      <div>
        <br />
        <h2>Comments</h2>
        <Togglable buttonLabel='Add comment'>
          <CommentForm
            handleSubmit={addComment}
            comment={newComment}
            blog={blog}
          />
        </Togglable>
        {console.log(blog.comments) }
        {blog.comments.map(comment => <div>{comment}</div>)}
      </div>

    </div>
  )
}

export default Blog