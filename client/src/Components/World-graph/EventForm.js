import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react'
import {  getWorldQuery, addEventMutation } from '../../queries/queries';

const EventForm = (props) => {
    
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [addEvent, { data }] = useMutation(addEventMutation);
    
    const handleSubmit = (e) => {
         e.preventDefault();
         console.log(props.myCharacterId);
        addEvent({variables: {
            title: title,
            text: text,
            characterId: props.myCharacterId,
            worldId: props.world._id
        }, refetchQueries: [{ query: getWorldQuery , variables: {id: props.world._id}}]
        })
        console.log(data)
        setTitle('');
        setText('');
    }
    
    
    return(
        <div>
        <Form className = "add-post" onSubmit = {handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field label='Title of the post' control='input' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Field label='Description' control='textarea' rows='3' value={text} onChange = {(e) => setText(e.target.value)} />
          <Form.Field control='button'>
            Add Event
          </Form.Field>
        </Form>
  </div>
)
}
export default EventForm;