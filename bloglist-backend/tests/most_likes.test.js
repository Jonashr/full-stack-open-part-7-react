const mostLikes = require('../utils/list_helper').mostLikes

describe('Favorite blogger test', () => {

  const emptyBlogList = []

  test('An empty list should return no name and 0', () => {
    const result = mostLikes(emptyBlogList)
    expect(result.author).toBe('')
    expect(result.likes).toBe(0)
  })

  const listWithThreeBlogsReoccuringAuthorHasMostLikes = [
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
      author: 'Author 1',
      url: 'http://url.com/2/',
      likes: 127
    },
    {
      _id: '12345',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'http://url.com/2/',
      likes: 24
    }
  ]

  test('Reoccuring author that has most total likes should be displayed with the correct amount of likes', () => {
    const result = mostLikes(listWithThreeBlogsReoccuringAuthorHasMostLikes)
    expect(result.author).toBe('Author 1')
    expect(result.likes).toBe(130)
  })

  const listWithThreeBlogsReoccuringAuthorHasLeastLikes = [
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
      author: 'Author 1',
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

  test('Author 3 has most likes', () => {
    const result = mostLikes(listWithThreeBlogsReoccuringAuthorHasLeastLikes)
    expect(result.author).toBe('Author 3')
    expect(result.likes).toBe(273)
  })



})