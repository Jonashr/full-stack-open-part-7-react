const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response, next) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  if(request.body.password.length < 3) {
    return response.status(400).json({
      error: 'Password should be at least three characters long.'
    })
  }

  console.log(request.body)

  const user = new User({
    name: request.body.name,
    username: request.body.username,
    passwordHash: passwordHash
  })

  try {
    const savedUser = await user.save()
    return response.json(savedUser)
  } catch(exception){
    next(exception)
  }

})

usersRouter.get('/', async(request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, likes: 1 })

  return response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
