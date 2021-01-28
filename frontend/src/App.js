import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

import './index.scss'
import './app.styles.scss'
import LogoChannels from './components/LogoChannels'
import Header from './components/Header'
import InnerChannels from './components/InnerChannels'
import MessageContainer from './components/chat/MessageContainer'
import OnlineUsers from './components/OnlineUsers'

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='flex'>
          <LogoChannels />
          <div className='flex flex-1 flex-col min-h-screen h-screen'>
            <Header />
            <div className='flex-1 flex overflow-y-hidden bg-discord-600'>
              <InnerChannels />
              <MessageContainer />
              <div className='flex justify-between'>
                <OnlineUsers />
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
