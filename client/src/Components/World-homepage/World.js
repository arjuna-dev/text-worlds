import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardEvent from './CardEvent';
import { getWorldQuery } from '../../queries/queries';
import ModalPopup from './ModalPopup';
import BackNavigation from '../BackNavigation';
import {Segment} from 'semantic-ui-react';

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
            <div className = "page-name">Inside This World</div>
            <div className = "world">
                <div className = "world-title">
                    <div><strong>{data.world.name}</strong></div>
                    <div className = "join-world"><ModalPopup world = {data.world} /></div>
                </div>
                <div className = "world-details">
                    <Segment size='big'>{data.world.description}</Segment>
                </div>
                <div className = "world-events">
                    <strong>EVENTS</strong> <br></br>
                    <div className = "world-elements-inside">
                        {data.world.events.map((event)=> (
                            <div key = {event._id}>
                                <CardEvent event = {event}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className = "world-characters">
                    <strong>CHARACTERS</strong> <br></br>
                    <div className = "world-elements-inside">
                        {data.world.characters.map((character)=> (
                            <div key = {character._id}>
                                <CardEvent character = {character}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className = "world-places">
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
                </div>
            </div>
        </div>
    );
}
 
export default World;