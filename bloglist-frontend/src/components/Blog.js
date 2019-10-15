import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButton, handleDeleteButton, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    font: 'italic',
    borderWidth: 2,
    marginBottom: 10
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='collapsedBlog'>
        <div onClick={toggleVisibility} className='toggleOn'>{blog.title} {blog.author}</div>
      </div>
      <div style={showWhenVisible} className='openedBlog'>
        <div onClick={toggleVisibility} className='toggleOff'>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes<button onClick={handleLikeButton} value={blog.id}>like</button></div>
        {blog.user !== undefined && blog.user.name !== undefined &&
            <div>{blog.user.name}</div>
        }
        {blog.user !== undefined && blog.user.username === user.data.username &&
        <div><button onClick={handleDeleteButton} value={blog.id}>delete</button></div>
        }
      </div>
    </div>
  )
}

export default Blog