import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import man from '../../assets/Characters/man.png'
import women from '../../assets/Characters/women.png'
import meteorCrash from '../../assets/Events/meteorCrash.png'

const CardEvent = (props) => {
  if (props.event){
    return(
    <Card key = {props.event._id} className = "card-event">
    <Image src={meteorCrash} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.event.title}</Card.Header>
      <Card.Meta>
        <span className='date'>Happened in 2019</span>
      </Card.Meta>
      <Card.Description>
        {props.event.text}
      </Card.Description>
    </Card.Content>
  </Card>
    )
}
if (props.character){
  var imageLink;
  if(props.character.gender == "male"){
    imageLink = man
  }
  else{
    imageLink = women
  }
}
  return (
  <div className = "card-character" key = {props.character._id}>
  <Card >
    <Image src={imageLink} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.character.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2019</span>
      </Card.Meta>
      <Card.Description>
        {props.character.story}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Icon name='user' />
        {props.character.role}
    </Card.Content>
  </Card>
  </div>
)}

export default CardEvent