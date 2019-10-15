var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((accumulated, blog) => {
    return accumulated + blog.likes
  }, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }


  let favBlog = blogs.reduce((currentMost, blog) => {
    if(currentMost.likes < blog.likes) {
      return blog
    } else {
      return currentMost
    }
  }, blogs[0])

  return favBlog
}

const mostBlogs = (blogs) => {
  const allNames = blogs.map(blog => blog.author)
  const nameArray = _.uniq(allNames)
  let mostOccurences = {
    author: '',
    blogs: 0
  }
  nameArray.forEach((author) => {
    let occurences = allNames.reduce((count, name) => {
      if(name === author) {
        return count + 1
      } else {
        return count
      }
    }, 0)

    if(occurences > mostOccurences.blogs) {
      mostOccurences.blogs = occurences
      mostOccurences.author = author
    }
  })
  return mostOccurences
}

const mostLikes = (blogs) => {
  const allBloggers = blogs.map(blog => blog.author)
  const allUniquebloggers = _.uniq(allBloggers)

  let currentBloggerWithMostLikes = {
    author: '',
    likes: 0
  }

  allUniquebloggers.forEach((blogger) => {
    let currentBloggerLikes = blogs.reduce((totalLikes, blog) => {
      if(blog.author === blogger) {
        return totalLikes + blog.likes
      } else {
        return totalLikes
      }
    }, 0)

    if(currentBloggerLikes > currentBloggerWithMostLikes.likes) {
      currentBloggerWithMostLikes.author = blogger
      currentBloggerWithMostLikes.likes = currentBloggerLikes
    }
  })
  return currentBloggerWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

