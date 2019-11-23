import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addPlaceMutation, getWorldQuery } from '../../queries/queries';
import { Label } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'


const ModalPopup = (props) => {
    const [name, setName]                  = useState('');
    const [parentPlace, setParentPlace]    = useState('');
    const [description, setDescription]    = useState('');
    let alreadyJoined                      = false;
    const [addPlace, { data, error }]      = useMutation(addPlaceMutation);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props);
        addPlace({variables: {
            name: name,
            parentPlace: parentPlace,
            description: description,
            // worldId: props.world._id,
            // userId: (jwt_decode(localStorage.usertoken))._id,
        }, refetchQueries: [{ query: getWorldQuery , variables: {id: props.world._id}}]}).then(()=>{
          setName('');
          setParentPlace('');
          setDescription('');
        })
        return null
    }
    //checking if authenticated
    if (!localStorage.usertoken){
      return (
        <Link to = '/login'><Button neutral= "true" className = "join-world"> Log in & Join the world </Button></Link>
      )
    }
    // checking if already joined
    props.world.characters.map((character) => {
      if(character.userId === jwt_decode(localStorage.usertoken)._id){
        alreadyJoined = true;
      }
      return null;
    })

    if(alreadyJoined){
      return <div> <Label color='olive' tag> Joined </Label> <Link to = {link}><Button positive className = "join-world">Get In!</Button></Link></div>
    }
    
    // modal popup to create a character
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