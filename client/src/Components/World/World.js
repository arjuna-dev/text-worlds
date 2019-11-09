import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardEvent from './CardEvent';
import { getWorldQuery } from '../../queries/queries';
import ModalPopup from './ModalPopup';

const World = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
      });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return (
        <div className = "world">
            <div className = "world-title">
                <div><strong>{data.world.name}</strong></div>
                <div className = "join-world"><ModalPopup worldId = {data.world._id} /></div>
            </div>
            <div className = "world-details">
                {data.world.description}
            </div>
            <div className = "world-events">
                <strong>EVENTS</strong> <br></br>
                <div className = "world-elements-inside">
                    {data.world.events.map((event)=> (
                        <CardEvent key = {event._key} event = {event}/>
                    ))}
                </div>
            </div>
            <div className = "world-characters">
                <strong>CHARACTERS</strong> <br></br>
                <div className = "world-elements-inside">
                    {data.world.characters.map((character)=> (
                        <CardEvent key = {character._key} character = {character}/>
                    ))}
                </div>
            </div>
            <div className = "world-places">
                <strong>PLACES</strong> <br></br>
                <div className = "world-elements-inside">
                    {data.world.characters.map((character)=> (
                        character.places.map((place) => (
                            <CardEvent key = {place._key} place = {place}/>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default World;