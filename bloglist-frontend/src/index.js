
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors/'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: green[500]
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
  , document.getElementById('root')
)
