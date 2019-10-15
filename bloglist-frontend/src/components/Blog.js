import React, { useState } from 'react'

const Blog = ({ blog, handleLikeButton, handleDeleteButton, user }) => {
  if(blog === undefined) {
    return null
  }
  
  console.log('BLOG', blog)
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
    </div>
  )
}

export default Blog