import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('new token', newToken)
  token = `bearer ${newToken}`
}


const create = async newObject => {
  const config = {
    headers: {Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    if(error.response.status === 401) {
      throw new Error('User not authorized to post new blogs.')
    } else {
      throw new Error(error)
    }
  }
}

const update = async (id, newObject) => {
  console.log('new object', newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log('response data:', response.data)
  return response.data
} 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

 const deleteItem = async id => {
  const config = {
    headers: {Authorization: token },
  }
   const response = await axios.delete(`${baseUrl}/${id}`, config)
   return response.data
 }

export default { getAll, setToken, create, update, deleteItem }