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
        userId
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
            _id
            userId
            name
            story
            role
            gender
            places{
              _id
              name
              description
            }
            posts{
              title
              text
              character{
                name
              }
            }
          }
          events{
            _id
            title
            text
          }
      }
  }
`

const addWorldMutation = gql`
    mutation AddWorld ($name: String!, $description: String!, $userId: String!){
    addWorld(name: $name, description: $description, userId: $userId){
        _id
        name
        description
        userId
        user {
            name
        }
      } 
  }`

const addCharacterMutation = gql`
    mutation AddCharacter ($name: String!, $story: String!, $userId: String!, $worldId: String!, $role: String, $gender: String ){
      addCharacter(name: $name, story: $story, userId: $userId, worldId: $worldId, role: $role, gender: $gender){
        name
        story
        world{
          _id
          name
          description
          characters{
            _id
            userId
            name
          }
        }
      }
    }
`


  export { getAllCharacters, addWorldMutation, getAllPlaces, getAllWorlds, getWorldQuery, addCharacterMutation };