import React from 'react';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

client
  .query({
    query: gql`
    {
      characters{
          name
          story
        } 
    }
    `
  })
  .then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Homepage />
      </div>
   </ApolloProvider>
  );
}

export default App;
