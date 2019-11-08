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
                <strong>{data.world.name}</strong>
                <ModalPopup worldId = {data.world._id} />
            </div>
            <div className = "world-details">
                {data.world.description}
            </div>
            <div className = "world-events">
                EVENTS <br></br>
                <div className = "world-elements-inside">
                    {data.world.events.map((event)=> (
                        <CardEvent event = {event}/>
                    ))}
                </div>
            </div>
            <div className = "world-characters">
                CHARACTERS <br></br>
                <div className = "world-elements-inside">
                    {data.world.characters.map((character)=> (
                        <CardEvent character = {character}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default World;