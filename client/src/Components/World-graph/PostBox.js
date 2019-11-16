import React from 'react';
import {Tab, Popup, Button, Grid} from 'semantic-ui-react';
import PostForm from './PostForm';
import EventForm from './EventForm';

const PostBox = (props) => {
    return <Button.Group size='large'>
    <Popup
    on='click'
    trigger={<Button>Write a post</Button>}
  > <PostForm world = {props.world} myCharacterId = {props.myCharacterId} /> </Popup>
    <Button.Or />
    <Popup
    on='click'
    trigger={<Button>Create an event</Button>}
  > <EventForm world = {props.world} myCharacterId = {props.myCharacterId} /> </Popup>
  </Button.Group>
}


export default PostBox;