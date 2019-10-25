import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('Blog reducer..', action)
  switch(action.type) {
  case 'INIT_BLOGS': {
    return action.data
  }
  case 'ADD_BLOG': {
    return [...state, action.data]
  }
  case 'LIKE': {
    const updatedBlog = action.data
    console.log('Updated blog...', updatedBlog)
    return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
  }
  default: {
    return state
  }
}
}

export const initializeBlogs = () => {
  return async dispatch => {
    let blogs = await blogService.getAll()
    blogs = blogs.sort((a, b) => a.likes - b.likes).reverse()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog, id) => {
  return async dispatch => {
    const updatedObject = { ...blog, likes: blog.likes + 1}

    console.log('LIKE BLOG', updatedObject)

    await blogService.update(id, updatedObject)
    dispatch({
      type: 'LIKE',
      data: updatedObject
    })
    
  }
}

// export const vote = (id, anecdote) => {
//   return async dispatch => {
//     const updatedObject = {
//       content: anecdote.content,
//       votes: anecdote.votes + 1,
//       id: anecdote.id
//     }
//     await anecdoteService.update(id, updatedObject)
//     dispatch({
//       type: 'VOTE',
//       data: updatedObject
//     })
//   }
// }

export default blogReducer