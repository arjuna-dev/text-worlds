import { gql } from "apollo-boost";

const getAllCharacters = gql`
    query {
    characters{
        name
        story
      } 
  }`

const getAllPlaces = gql`
    query {
    places{
        name
        description
      } 
  }`

const getAllWorlds = gql`
    query {
    worlds{
        _id
        name
        description
      } 
  }`

const addWorldMutation = gql`
    mutation AddWorld ($name: String!, $description: String!, $userId: String){
    addWorld(name: $name, description: $description, userId: $userId){
        name
        description
        user {
            name
        }
      } 
  }`


  export { getAllCharacters, addWorldMutation, getAllPlaces, getAllWorlds };