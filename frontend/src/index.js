import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppProviders from './AppProviders'
class Index extends React.Component {
  render() {
    return (
      <AppProviders>
        <App />
      </AppProviders>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
