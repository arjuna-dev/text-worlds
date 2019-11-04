import React from 'react'
import { List, Image } from 'semantic-ui-react'
import WorldDescription from './WorldDescription';
import p1 from '../../assets/Worlds/p1.png'

import { getAllWorlds } from '../../queries/queries';
import { useQuery } from '@apollo/react-hooks';


function WorldList() {
const { loading, error, data } = useQuery(getAllWorlds);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;
    return data.worlds.map(( world ) => (
      <div className = "world-list">
        <List size='massive'>
          <List.Item>
            <Image avatar src={ p1 } />
            <List.Content>
            <List.Header as='a'>{ world.name }</List.Header>
              <List.Description>
                  <WorldDescription>{ world.description }</WorldDescription>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
      )
    );
}


export default WorldList;