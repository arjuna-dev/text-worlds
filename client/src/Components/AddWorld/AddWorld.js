import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react'
import { addWorldMutation, getAllWorlds } from '../../queries/queries';
import BackNavigation from '../Helpers/BackNavigation';
import jwt_decode from 'jwt-decode'
import { createBrowserHistory } from 'history';

let history = createBrowserHistory();

const AddWorld = () => {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [created, setCreated] = useState(false)
    const [addWorld, { data }] = useMutation(addWorldMutation);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let userId = 0;
        if (localStorage.usertoken){
          userId = (jwt_decode(localStorage.usertoken))._id;
        }
        addWorld({variables: {
            name: name,
            description: description,
            userId: userId
        }, refetchQueries: [{ query: getAllWorlds}]
        })
        //console.log(data)
        setName('');
        setDescription('');
        setCreated(true)
    }
    
    if (created){
      return (history.push('/'))
    }

    if (!localStorage.usertoken){
      return (history.push('/login'))
    }
    
    return(
        <div>
        <BackNavigation />
        <div className = "page-name">Build A New World</div>
        <Form className = "add-world" onSubmit = {handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field label='Name of the world' control='input' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Field label='Description of the World' control='textarea' rows='3' value={description} onChange = {(e) => setDescription(e.target.value)} />
          <Form.Field control='button'>
            Create World
          </Form.Field>
        </Form>
  </div>
)
}
export default AddWorld;