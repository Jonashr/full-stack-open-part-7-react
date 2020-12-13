import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS': {
    return action.data
  }
  case 'ADD_BLOG': {
    return [...state, action.data]
  }
  case 'ADD_COMMENT': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }
  case 'LIKE': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }
  case 'DELETE': {
    return state.filter(blog => blog.id !== action.data)
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

export const addComment = (blog, id) => {
  return async dispatch => {
    await blogService.createComment(blog, id)
    dispatch({
      type: 'ADD_COMMENT',
      data: blog
    })
  }
}

export const likeBlog = (blog, id) => {
  return async dispatch => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }

    await blogService.update(id, updatedObject)
    dispatch({
      type: 'LIKE',
      data: updatedObject
    })

  }
}

export const deleteBlog = (id) => {

  return async dispatch => {
    await blogService.deleteItem(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}



export default blogReducer