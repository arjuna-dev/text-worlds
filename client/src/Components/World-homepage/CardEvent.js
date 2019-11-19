import React from 'react'
import { Card } from 'semantic-ui-react'
import meteorCrash from '../../assets/Events/meteorCrash.png'
import placeholder from '../../assets/placeholder.png'

const CardEvent = (props) => {
  if (props.event){
    return(
        <Card key = {props.event._id} className = "card-event">
          <Card.Content>
            <Card.Header>{props.event.title}</Card.Header>
            <Card.Meta>
              <span className='date'>Happened on {props.event.dateCreated}</span>
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
      <Card>
        <Card.Content>
          <Card.Header>{props.character.name}</Card.Header>
          <Card.Meta>
            <span className='date'> Joined {props.character.dateCreated}</span>
          </Card.Meta>
          <Card.Description>
            <br /><strong>Background </strong><br /><br />
            {props.character.story}
          </Card.Description>
        </Card.Content>
      </Card>
      </div>
    )}

  // if (props.place){
  //   return(
  //     <div className = "card-character" key = {props.place._id}>
  //       <Card >
  //         <Image src={placeholder} wrapped ui={false} className = "image-card" />
  //         <Card.Content>
  //           <Card.Header>{props.place.name}</Card.Header>
  //           <Card.Meta>
  //             <span className='date'>Found in {props.place.dateCreated}</span>
  //           </Card.Meta>
  //           <Card.Description>
  //             {props.place.description}
  //           </Card.Description>
  //         </Card.Content>
  //       </Card>
  //     </div>
  //   )
  // }
}


export default CardEvent