const favoriteBlog = require('../utils/list_helper').favoriteBlog

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

  test('Favorite blog with three blogs', () => {
    const result = favoriteBlog(listWithThreeBlogs)
    expect(result.title).toBe('Blog 3')
    expect(result.author).toBe('Author 3')
    expect(result.likes).toBe(273)
  })

  const listWithSingleBlog = [
    {
      _id: '123',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://url.com/1/',
      likes: 3
    }
  ]

  test('Favorite blog with one blog', () => {
    const result = favoriteBlog(listWithSingleBlog)
    expect(result.title).toBe('Blog 1')
    expect(result.author).toBe('Author 1')
    expect(result.likes).toBe(3)
  })

  const emptyBlogList = [

  ]

  test('Favorite blog empty list', () => {
    const result = favoriteBlog(emptyBlogList)
    expect(result).toBe(null)
  })
})