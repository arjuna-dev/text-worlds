import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CardEvent from './CardEvent';
import { getWorldQuery } from '../../queries/queries';

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
            </div>
            <div className = "world-details">
                {data.world.description}
            </div>
            <div className = "world-events">

            </div>
            <div className = "world-characters">
                {data.world.characters.map((character)=> (
                    <CardEvent character = {character} />
                ))}
            </div>
        </div>
    );
}
 
export default World;