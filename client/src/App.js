import React from 'react';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import World from './Components/World/World';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route exact path = '/' component = {Homepage}/>
        <Route exact path = '/world/:id' component = {World}/>
      </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
