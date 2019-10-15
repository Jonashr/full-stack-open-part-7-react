import React from 'react'
import Blog from './Blog'
import {Link} from 'react-router-dom'

const Blogs = ({blogs, handleLikeButton, handleDeleteButton, user}) => {
    const blogStyle = {
        paddingTop: 5,
        paddingLeft: 2,
        border: 'solid',
        font: 'italic',
        borderWidth: 2,
        marginBottom: 10
      }
    
    return(
        <div>
          {blogs.map(blog => 
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )}
        </div>
    )
}

export default Blogs