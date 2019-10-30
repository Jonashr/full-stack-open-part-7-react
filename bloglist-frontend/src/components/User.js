import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if(props.user === undefined) {
    return null
  }

  return(
    <div>
      <h3>{props.user.username}</h3>
      <h3>Added Blogs</h3>
      {props.user.blogs !== undefined &&
          <ul>
            {props.user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>)}
          </ul>
      }
    </div>
  )
}



export default connect(null, null) (User)