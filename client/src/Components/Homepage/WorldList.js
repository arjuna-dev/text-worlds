import React from 'react'
import { List, Image } from 'semantic-ui-react'
import Header from '../Header/Header'
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

if (loading) {
    return <div className="ui active centered loader loading-screen"></div>
};
if (error) return <p>Error :(</p>;
    return (
      <div>
        <Header />
        <div className = "world-list">
          <List size='massive'>
            {data.worlds.map(( world ) => (
              <List.Item style={{ marginBottom: '9vh' }} key={world._id}>
                <Link to = {'/world/' + world._id} ><Image style={{ display: 'inline-block' }} avatar src={ picNames[Math.floor(Math.random() * Math.floor(4))] } size="small" /></Link>
                <List.Content style={{ display: 'inline-block', marginLeft: "2vw" }}>
                  <Link to = {'/world/' + world._id}><List.Header><div className = "world-header">{ world.name }</div></List.Header></Link>
                    <List.Description>
                        <WorldDescription>{ world.description }</WorldDescription>
                    </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    );
}


export default WorldList;