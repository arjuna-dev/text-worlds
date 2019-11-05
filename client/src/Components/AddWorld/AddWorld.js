import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react'
import { addWorldMutation } from '../../queries/queries';

const AddWorld = () => {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [addWorld, { data }] = useMutation(addWorldMutation);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addWorld({variables: {
            name: name,
            description: description
        }})
        setName('');
        setDescription('');
    }
    
    
    
    return(
        <div>
  <Form className = "add-world" onSubmit = {handleSubmit}>
    <Form.Group widths='equal'>
      <Form.Field label='Name of the world' control='input' value={name} onChange={(e) => setName(e.target.value)} />
    </Form.Group>
    {/* <Form.Group grouped>
      <label>Type of World</label>
      <Form.Field
        label='Public'
        control='input'
        type='radio'
        name='htmlRadios'
      />
      <Form.Field
        label='Private'
        control='input'
        type='radio'
        name='htmlRadios'
      />
    </Form.Group>
    <Form.Group grouped>
      <label>Join with Moderator Approval?</label>
      <Form.Field
        label='Yes'
        control='input'
        type='radio'
        name='htmlRadios2'
      />
      <Form.Field
        label='No'
        control='input'
        type='radio'
        name='htmlRadios2'
      /> */}
    {/* </Form.Group> */}
    <Form.Field label='Description of the World' control='textarea' rows='3' value={description} onChange = {(e) => setDescription(e.target.value)} />
    <Form.Field control='button'>
      Create World
    </Form.Field>
  </Form>
  </div>
)
}
export default AddWorld;