import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import App from './App.tsx'
import './index.css'
import '@fontsource-variable/karla'
import '@fontsource-variable/noto-sans'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT as string,
    headers: {
      'Apollo-Require-Preflight': 'true'
    }
  })
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
