import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { addCharacterMutation } from '../../queries/queries';

const ModalPopup = (props) => {
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [addCharacter, { data }] = useMutation(addCharacterMutation);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props);
        addCharacter({variables: {
            name: name,
            story: story,
            worldId: props.worldId,
            role: role,
            gender: gender
        }})
        console.log(data);
        setName('');
        setStory('');
        setRole('');
        setGender('male');
    }
    
    return(
  <Modal trigger={<Button positive className = "join-world">Join the world</Button>}>
    <Modal.Header>Define your character</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
      <Modal.Description>
        <Header>Fill out the form</Header>
        <Form className = "add-character" onSubmit = {handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field label='Name of the character' control='input' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Field label='Your Background Story' control='textarea' rows='3' value={story} onChange = {(e) => setStory(e.target.value)} />
            <Form.Group widths='equal'>
                <Form.Field label='Role in the World' control='input' value={role} onChange={(e) => setRole(e.target.value)} />
            </Form.Group>
            {/* <div onChange={event => setGender(event)}>
                <input type="radio" value="Male" name="gender"/> Male
                <input type="radio" value="Female" name="gender"/> Female
            </div> */}
            <Form.Field control='button'>
                CREATE CHARACTER
            </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)}

export default ModalPopup