import axios from 'axios'

const baseUrl = '/api/login'

const login = async credentials => {
  try {
    console.log('Credentials.. ', credentials)
    const response =  await axios.post(baseUrl, credentials)
    return response
  } catch(error) {
    console.log('Login caught exception?', error.response)
    throw error
  }
}

export default { login }