import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, handleLikeButton, handleDeleteButton, user}) => {
    return(
        <div>
            {blogs.map(blog =>
                 <Blog key={blog.id} blog={blog} handleLikeButton={handleLikeButton} handleDeleteButton={handleDeleteButton} user={user} />)}
        </div>
    )
}


export default Blogs