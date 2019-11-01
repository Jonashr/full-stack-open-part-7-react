import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch(error) {
    console.log(error)
  }
}

const createComment = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
    return response.data
  } catch(error) {
    console.log(error)
  }
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deleteItem = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, deleteItem, createComment }