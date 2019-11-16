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
              text
              character{
                name
              }
            }
            events{
              _id
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
const addPostMutation = gql`
  mutation AddPost($title: String!, $text: String!, $characterId: String!){
    addPost(title: $title, text: $text, characterId: $characterId){
      _id
      title
      text
      character{
        name
      }
    }
  }
`
const addEventMutation = gql`
  mutation AddEvent($title: String!, $text: String!, $characterId: String!, $worldId: String!){
    addEvent(title: $title, text: $text, characterId: $characterId, worldId: $worldId){
      _id
      title
      text
      character{
        name
      }
      world{
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


  export { getAllCharacters, addWorldMutation, addPostMutation, addEventMutation, getAllPlaces, getAllWorlds, getWorldQuery, addCharacterMutation };