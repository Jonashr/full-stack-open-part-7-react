import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from '../App'
jest.mock('../services/blogs')

describe('<App />', () => {
  test('If no user is logged in login form is rendered and no blogs are rendered', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement (
      () => component.getByText('login')
    )

    const loginForm = component.container.querySelector('.login')

    expect(loginForm).toBeDefined()

    expect(component.container).toHaveTextContent(
      'Login'
    )

    expect(component.container).toHaveTextContent('password')

    const blogs = component.container.querySelector('.blog')

    expect(blogs).toBeNull

  })

  test('When user is logged in, blog posts are rendered to the page', async () => {

    const user = {
      username: 'Tester',
      data: {
        token: '132321'
      },
      name: 'Donald tester'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))


    const component = render(
      <App />
    )

    console.log(localStorage)

    component.rerender(<App />)


    await waitForElement (
      () => component.container.querySelectorAll('.blog')
    )

    // console.log(component.container)

    const blogs = component.container.querySelectorAll('.collapsedBlog')
    console.log(blogs.length)
    expect(blogs.length).toBe(3)

    expect(blogs).toBeDefined


  })

})