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
            role
            gender
          }
          events{
            title
            text
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

const addCharacterMutation = gql`
    mutation AddCharacter ($name: String!, $story: String!, $userId: String, $worldId: String! ){
      addCharacter(name: $name, story: $story, userId: $userId, worldId: $worldId){
        name
        story
      }
    }
`


  export { getAllCharacters, addWorldMutation, getAllPlaces, getAllWorlds, getWorldQuery, addCharacterMutation };