const mostBlogs = require('../utils/list_helper').mostBlogs

describe('Favorite blog test', () => {
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

  test('List with three blogs where same person occurs twice will return the author that occured twice', () => {
    const result = mostBlogs(listWithThreeBlogs)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(2)
  })

  const emptyBlogList = []

  test('An empty list should return no name and 0', () => {
    const result = mostBlogs(emptyBlogList)
    expect(result.author).toBe('')
    expect(result.blogs).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    }
  ]

  test('List with one should return the author of that book and value 1', () => {
    const result = mostBlogs(listWithOneBlog)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(1)
  })

  const listWithTenBlogs = [
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
    },
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
    },
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
    },
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    }
  ]

  test('List with ten blogs should return the author of that book and the correct number of blogs', () => {
    const result = mostBlogs(listWithTenBlogs)
    expect(result.author).toBe('Author 1')
    expect(result.blogs).toBe(7)
  })


})