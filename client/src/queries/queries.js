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
            dateCreated
            type
            text
            character{
              name
            }
            likes
            deletes
            likesCharsId
            deletesCharsId
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
              dateCreated
            }
            posts{
              _id
              title
              dateCreated
              type
              text
              character{
                name
                user{
                  _id
                }
              }
              likes
              deletes
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
  mutation AddPost($title: String!, $text: String!, $characterId: String!, $type: String!, $worldId: String!, $likes: Int, $deletes: Int){
    addPost(title: $title, text: $text, characterId: $characterId, type: $type, worldId: $worldId, likes: $likes, deletes: $deletes){
      _id
      title
      text
      likes
      deletes
      type
      character{
        name
      }
      likesCharsId
      deletesCharsId
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

const deletePostMutation = gql`
    mutation DeletePost ($id: ID!){
      deletePost(id: $id){
        title
      }
    }
`
const updatePostMutation = gql`
    mutation UpdatePost ($id: ID!, $likes: Int, $deletes: Int, $likesCharsId: [String], $deletesCharsId: [String]){
      updatePost(id: $id, likes: $likes, deletes: $deletes, likesCharsId: $likesCharsId, deletesCharsId: $deletesCharsId){
        title
      }
    }
`

const addPlaceMutation = gql`
    mutation AddPlace ($user: String, $id: Number, $name: String, $parentPlace: String, $description: String){
      addAPlace(user: $user, id: $id, name: $name, parentPlace: $parentPlace, description: $description){
        user
        name
        parentPlace
        description

      }
    }
`


  export { getAllCharacters, addWorldMutation, addPostMutation,deletePostMutation, updatePostMutation, getAllPlaces, getAllWorlds, getWorldQuery, addCharacterMutation, addPlaceMutation };