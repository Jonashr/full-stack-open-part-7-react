const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
  return response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET_PASSWORD)
    if(!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  try {
    const { id } = request.params
    let blog = await Blog.findById(id)
    blog.comments = body.comments
    blog = await blog.save()
    return response.status(201).json(blog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const { id } = request.params
    const user = await User.findById(body.user.id)

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: body.comments
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    return response.status(200).json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const decodedToken = jwt.verify(request.token, process.env.SECRET_PASSWORD)
    if(!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(id)

    if(!blog.user || blog.user.toString() !== user._id) {
      return response.status(401).json({ error: 'Token does not match the user' })
    }

    await Blog.remove(blog)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})



module.exports = blogsRouter