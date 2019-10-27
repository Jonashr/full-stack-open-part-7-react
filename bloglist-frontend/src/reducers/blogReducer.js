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
    return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
  }
  case 'DELETE': {
    console.log('Hello from delete...')
    console.log('Filter state..', state.filter(blog => blog.id !== action.data))
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
    console.log('add blog', blog)
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

export const deleteBlog = (id) => {

  return async dispatch => {
    await blogService.deleteItem(id)
    dispatch({ 
        type: 'DELETE',
        data: id
    })
  }
}

export const addComment = (blog, id) => {
  return async dispatch => {
    await blogService.addComment(blog,id)
    dispatch({
      type: 'ADD_COMMENT',
      data: blog
    })
  }
}

export default blogReducer