import { gql } from "apollo-boost";

const getAllCharacters = gql`
    query {
    characters{
        name
        dateCreated
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
          posts{
            _id
            title
            type
            text
            character{
              name
            }
          }
          characters{
            dateCreated
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
              _id
              title
              type
              text
              character{
                name
              }
            }
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
const addPostMutation = gql`
  mutation AddPost($title: String!, $text: String!, $characterId: String!, $type: String!, $worldId: String!){
    addPost(title: $title, text: $text, characterId: $characterId, type: $type, worldId: $worldId){
      _id
      title
      text
      type
      character{
        name
      }
    }
  }
`

const addCharacterMutation = gql`
    mutation AddCharacter ($name: String!, $story: String!, $userId: String!, $worldId: String!, $role: String, $gender: String ){
      addCharacter(name: $name, story: $story, userId: $userId, worldId: $worldId, role: $role, gender: $gender){
        name
        story
        dateCreated
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


  export { getAllCharacters, addWorldMutation, addPostMutation, getAllPlaces, getAllWorlds, getWorldQuery, addCharacterMutation };