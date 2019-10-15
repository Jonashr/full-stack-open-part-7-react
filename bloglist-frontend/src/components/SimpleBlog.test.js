import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('Renders content succesfully', () => {
  const simpleBlog = {
    title: 'Simple blog title',
    author: 'Author of the blog',
    likes: 10
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  expect(component.container).toHaveTextContent('Simple blog title')
  expect(component.container).toHaveTextContent('Author of the blog')
  expect(component.container).toHaveTextContent('10')

})

test('Event handler is called twice when the like button is clicked two times', () => {
  const simpleBlog = {
    title: 'Simple blog title',
    author: 'Author of the blog',
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})