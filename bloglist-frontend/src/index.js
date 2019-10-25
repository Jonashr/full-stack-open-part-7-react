
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Container } from 'semantic-ui-react'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>, document.getElementById('root')
)
