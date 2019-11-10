import React from 'react';
import './App.css';
import World from './Components/World/World';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route } from 'react-router-dom';
import WorldList from './Components/Homepage/WorldList';
import AddWorld from './Components/AddWorld/AddWorld';
import Signup from './Components/Forms/Signup';
import Login from './Components/Forms/Login';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route exact path = '/' component = {WorldList}/>
        <Route exact path = '/add-world' component = {AddWorld} />
        <Route exact path = '/signup' component = {Signup} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/world/:id' component = {World}/>
      </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
