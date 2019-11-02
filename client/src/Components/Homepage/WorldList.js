import React from 'react'
import { List, Image } from 'semantic-ui-react'
import WorldDescription from './WorldDescription';
import p1 from '../../assets/Worlds/p1.png'

const ListExampleImage = () => (
  <List size='massive'>
    <List.Item>
      <Image avatar src={ p1 } />
      <List.Content>
        <List.Header as='a'>Nmz34f</List.Header>
        <List.Description>
            <WorldDescription>In the year 3312, planeat earth...</WorldDescription>
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
)

export default ListExampleImage