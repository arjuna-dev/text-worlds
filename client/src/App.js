import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter} from 'react-router-dom';
import Container from './Container';


const client = new ApolloClient({
  uri: 'https://textworlds.herokuapp.com/graphql',
});



function App() {
  return (
  <ApolloProvider client={client}>
      <BrowserRouter>
        <Container />
      </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
