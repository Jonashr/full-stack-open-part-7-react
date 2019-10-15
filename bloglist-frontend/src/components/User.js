import React from 'react'
import {
    Link
} from 'react-router-dom'

const User = ({user}) => {
    if(user === undefined) {
        return null
    }

    return(
        <div>
            <h3>{user.username}</h3>
            <h3>Added Blogs</h3>
            {user.blogs !== undefined &&
                        <ul>
                        {user.blogs.map(blog => 
                          <li key={blog.id}>
                              {blog.title}
                          </li>)}
                    </ul>
            }
        </div>
    )
}

export default User