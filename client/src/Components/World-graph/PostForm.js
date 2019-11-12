import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react'
import {  getAllWorlds } from '../../queries/queries';
import BackNavigation from '../BackNavigation';
import {Redirect} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const PostForm = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [created, setCreated] = useState(false)
    //const [addPost, { data }] = useMutation(addPostMutation);
    
    const handleSubmit = (e) => {
         e.preventDefault();
        // console.log((jwt_decode(localStorage.usertoken))._id);
        // addWorld({variables: {
        //     title: title,
        //     description: description,
        //     userId: (jwt_decode(localStorage.usertoken))._id
        // }, refetchQueries: [{ query: getAllWorlds}]
        // })
        // console.log(data)
        // setName('');
        // setDescription('');
        // setCreated(true)
    }
    
    // if (created){
    //   return (<Redirect to = '/' />)
    // }

    if (!localStorage.usertoken){
      return (<Redirect to = '/login' />)
    }
    
    return(
        <div>
        <Form className = "add-world" onSubmit = {handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field label='Title of the post' control='input' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Field label='Description' control='textarea' rows='3' value={description} onChange = {(e) => setDescription(e.target.value)} />
          <Form.Field control='button'>
            Post
          </Form.Field>
        </Form>
  </div>
)
}
export default PostForm;