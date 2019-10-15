const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithThreeBlogs = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    },
    {
      _id: '1234',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url.com/2/',
      likes: 13
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 273
    }
  ]

  test('When list of blogs contains three blogs it should return the sum of votes from all the blogs', () => {
    const result = totalLikes(listWithThreeBlogs)
    expect(result).toBe(289)
  }
  )

  const listWithThreeBlogsNoLikes = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 0
    },
    {
      _id: '1234',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://url.com/2/',
      likes: 0
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 0
    }
  ]

  test('When list of blogs contains blogs with no votes recorded it should return 0 votes', () => {
    const result = totalLikes(listWithThreeBlogsNoLikes)
    expect(result).toBe(0)
  })

  const emptyList = []

  test('When list of blogs is empty it should return 0 likes', () => {
    const result = totalLikes(emptyList)
    expect(result).toBe(0)
  })
})