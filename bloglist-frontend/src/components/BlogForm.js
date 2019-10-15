import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, title, author, url }) => {
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
           author
          <input {...author} />
        </div>
        <div>
           url
          <input {...url} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>)
}

BlogForm.propTypes = {
  handleSubmit:PropTypes.func.isRequired
}

export default BlogForm