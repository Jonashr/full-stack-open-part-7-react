import React from 'react'

const User = ({ user }) => {
  if(!user) {
    return null
  }

  return(
    <div>
      <h3>{user.username}</h3>
      <h3>Added Blogs</h3>
      {!user.blogs &&
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