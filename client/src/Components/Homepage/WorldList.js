import React from 'react'
import { List, Image } from 'semantic-ui-react'
import WorldDescription from './WorldDescription';
import { Link } from 'react-router-dom';
import p1 from '../../assets/Worlds/p1.png'
import p2 from '../../assets/Worlds/p2.png'
import pf3 from '../../assets/Worlds/pf3.png'
import pf4 from '../../assets/Worlds/pf4.png'
import pp1 from '../../assets/Worlds/pp1.png'

import { getAllWorlds } from '../../queries/queries';
import { useQuery } from '@apollo/react-hooks';


function WorldList() {
const { loading, error, data } = useQuery(getAllWorlds);
const picNames = [p1, p2, pf3, pf4, pp1];

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;
    return (
      <div className = "world-list">
        {data.worlds.map(( world ) => (
          <List size='massive' key={world._id}>
            <List.Item>
              <Image avatar src={ picNames[Math.floor(Math.random() * Math.floor(4))] } />
              <List.Content>
              <Link to = {'/world/' + world._id} ><List.Header as='a'>{ world.name }</List.Header></Link>
                <List.Description>
                    <WorldDescription>{ world.description }</WorldDescription>
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        ))}
      </div>
    );
}


export default WorldList;