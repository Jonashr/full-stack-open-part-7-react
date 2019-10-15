import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/*
Write tests for the Blog component of your application that verify that only the name and author of the blog post are shown by default.
 Also verify that when the blog post is clicked, the other information of the blog post becomes visible.
*/
describe('<Blog /> Test', () => {
  let blog = {
    title: 'Blog title',
    author: 'Author',
    url: 'http://www.blog.com/',
    likes: 10
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('Blog only renders name and author by default', () => {
    const div = component.container.querySelector('.collapsedBlog')
    expect(div).toHaveTextContent('Blog title')
    expect(div).toHaveTextContent('Author')
    expect(div).not.toHaveTextContent('http://www.blog.com/')
    expect(div).not.toHaveTextContent(10)
    expect(div).not.toHaveStyle('display: none')
  })

  test('Initially the detailed information is not shown', () => {
    const div = component.container.querySelector('.openedBlog')
    expect(div).toHaveStyle('display: none')
  })

  test('When blog post is clicked, display is no longer none', () => {
    const toggleOnDiv = component.container.querySelector('.toggleOn')
    fireEvent.click(toggleOnDiv)
    expect(toggleOnDiv).not.toHaveStyle('display: none')
  })

})



