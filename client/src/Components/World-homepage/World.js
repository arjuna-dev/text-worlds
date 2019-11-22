import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardEvent from './CardEvent';
import ReadMore from '../ReadMore';
import { getWorldQuery } from '../../queries/queries';
import ModalPopup from './ModalPopup';
import BackNavigation from '../BackNavigation';
import {Segment, Header, Icon, Card} from 'semantic-ui-react';

const World = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
      });
    if (loading) return <div className="ui active centered loader"></div>
    if (error) return <div>Error :( Try again later</div>;
    console.log(data);
    return (
        <div>
            <BackNavigation />
            <div className = "world">
            <div className = "world-title">
            <Header as='h2' icon>
                <Icon name='world' />
                {data.world.name}
                <Header.Subheader style = {{fontSize: "0.8em"}}>
                <ReadMore line = {2}>
                {data.world.description}
                </ReadMore>
                </Header.Subheader>
            </Header>
                    <div className = "join-world"><ModalPopup world = {data.world} /></div>
                </div>
                <div className = "world-info">
                    <div className = "world-events-parent">
                    <Header as='h3' dividing>
                        <Icon name = 'history' />World Timeline
                    </Header>
                    <br />
                        <div className = "world-events">
                        <Card.Group>
                            {data.world.posts.map((post)=> (
                                <div key = {post._id}>
                                    {post.type === 'Event'?<CardEvent event = {post}/>:null}
                                </div>
                            ))}
                        </Card.Group>
                        </div>
                    </div>
                    <div className = "world-characters-parent">
                    <Header as='h3' dividing>
                        <Icon name = 'users' />All Characters
                    </Header>
                    <br />
                        <div className = "world-characters">
                        <Card.Group>
                            {data.world.characters.map((character)=> (
                                    <CardEvent character = {character} key = {character._id}/>
                            ))}
                        </Card.Group>
                        </div>
                    </div>
                </div>
                {/* <div className = "world-places">
                    <strong>PLACES</strong> <br></br>
                    <div className = "world-elements-inside">
                        {data.world.characters.map((character)=> (
                            character.places.map((place) => (
                                <div key = {place._id}>
                                    <CardEvent place = {place}/>
                                </div>
                            ))
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
}
 
export default World;