const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
  const body = request.body

  console.log('Login body.', body.username)

  const user = await User.findOne({ username: body.username.value })

  console.log('User', user)

  let passwordIsCorrect = false
  if(user !== null) {
    passwordIsCorrect =  await bcrypt.compare(body.password.value, user.passwordHash)
  }

  if(!passwordIsCorrect) {
    return response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  console.log('User token', userToken)

  const token = jwt.sign(userToken, process.env.SECRET_PASSWORD)
  console.log('TOKEN:', token)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter

