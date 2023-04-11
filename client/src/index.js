import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, split } from '@apollo/client';
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
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
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
