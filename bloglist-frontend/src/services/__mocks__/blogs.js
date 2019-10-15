const blogs = [
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Title 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 10,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'username1',
      name: 'name1'
    }
  },
  {
    id: '5a451e21e0b8b04a45638212',
    title: 'Title 2',
    author: 'Author 2',
    url: 'Url 2',
    likes: 10,
    user: {
      _id: '5a437a9e514ab7f168ddf139',
      username: 'username2',
      name: 'name2'
    }
  },
  {
    id: '5a451e21e0b8b04a45638213',
    title: 'Title 3',
    author: 'Author 3',
    url: 'Url 3',
    likes: 13,
    user: {
      _id: '5a437a9e514ab7f168ddf133',
      username: 'username3',
      name: 'name3'
    }
  }
]

const setToken = newToken => {
  console.log('new token', newToken)
  // token = `bearer ${newToken}`
}


const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }