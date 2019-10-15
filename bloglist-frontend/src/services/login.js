import axios from 'axios'

const baseUrl = '/api/login'

const login = async credentials => {
  console.log('wtf')
  try {
    const response =  await axios.post(baseUrl, credentials)
    return response
  } catch(error) {
    console.log('Login caught exception?', error)
    throw new Error(error)
  }
}

export default { login }