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

const getWorldQuery = gql`
  query GetWorld($id: ID!){
      world(id: $id){
          _id
          name
          maxNumberOfCharacters
          minNumberOfCharacters
          description
          year
          private
          user{
            name
          }
          characters{
            name
            story
          }
      }
  }
`

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



  export { getAllCharacters, addWorldMutation, getAllPlaces, getAllWorlds, getWorldQuery };