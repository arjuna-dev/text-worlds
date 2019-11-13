import React, { useState } from 'react'
import { Grid, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Content from './Content'

const SideBar = (props) => {
    const [activeItem, setActiveItem] = useState('');
    const [activeContent, setActiveContent] = useState(props.world);

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name={props.world.name}
              active={activeItem === props.world.name}
              onClick={(e) => {setActiveItem(props.world.name); setActiveContent(props.world)}}
            />
            {props.world.characters.map((character) => {
                return (
                    <Menu.Item
                        key = {character._id}
                        name={character.name}
                        active={activeItem === character.name}
                        onClick={(e) => {setActiveItem(character.name); setActiveContent(character)}}
                    />
                )
            })}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
              {activeContent == props.world?(
                  props.world.characters.map((character)=>
                      <Content posts = {character.posts} />
                  )
              ):(<Content posts = {activeContent.posts}/>)
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default SideBar;