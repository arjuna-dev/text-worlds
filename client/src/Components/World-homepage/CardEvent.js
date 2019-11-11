import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import meteorCrash from '../../assets/Events/meteorCrash.png'
import placeholder from '../../assets/placeholder.png'

const CardEvent = (props) => {
  let imageLink = "https://react.semantic-ui.com/images/avatar/large/daniel.jpg";
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

  if (props.place){
    return(
      <div className = "card-character" key = {props.place._id}>
        <Card >
          <Image src={placeholder} wrapped ui={false} className = "image-card" />
          <Card.Content>
            <Card.Header>{props.place.name}</Card.Header>
            <Card.Meta>
              <span className='date'>Found in 2019</span>
            </Card.Meta>
            <Card.Description>
              {props.place.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}


export default CardEvent