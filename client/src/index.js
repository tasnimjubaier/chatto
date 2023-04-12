import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, split, ApolloLink, concat } from '@apollo/client';
import { Provider } from 'react-redux'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

import App from './App';
import { store } from './app/store';
import './index.css'
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
        'client-name': 'Chatto',
        'client-version': '1.0.0'
      }
    }
  })
  return forward(operation)
})


const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql'
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  concat(authMiddleware, httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App /> 
      </Provider>
    </ApolloProvider>
  // </React.StrictMode>
);
