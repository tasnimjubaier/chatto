import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Provider } from 'react-redux'

import App from './App';
import { store } from './app/store';
import './index.css'


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
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
