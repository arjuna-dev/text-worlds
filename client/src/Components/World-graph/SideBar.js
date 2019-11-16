import React, { useState, useEffect} from 'react'
import { Grid, Menu, Segment, Header, Label, List } from 'semantic-ui-react'

const SideBar = (props) => {

    const [activeItem, setActiveItem] = useState(props.world.name);
    const [activeContent, setActiveContent] = useState(props.world);


    useEffect(() => {
      setActiveItem(props.world.name);
      setActiveContent(props.world)
    },[props.world])

    let worldName = '🌍' + props.world.name
    return (
      <Grid>
        <Grid.Column width={4}>
          <div className = "sidebar">
          <Menu fluid vertical tabular>
              <Menu.Item
                name= {worldName}
                key={props.world._id}
                active={activeItem === props.world.name}
                onClick={(e) => {setActiveItem(props.world.name); setActiveContent(props.world);}}
              />
            {props.world.characters.map((character) => {
                let characterName = '👤' + character.name;
                return (
                    <Menu.Item
                        key = {character._id}
                        name= {characterName}
                        active={activeItem === character.name}
                        onClick={(e) => {setActiveItem(character.name); setActiveContent(character);}}
                    />
                )
            })}
          </Menu>
          </div>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {/* {world/character description} */}
          <div className = "sidebar-header">
              {activeContent==props.world?(
                    <div>
                      <Header  attached = "top"> 🌍 {activeContent.name} </Header>
                      <Segment attached content = {activeContent.description}/>
                    </div>
                  ):(
                    <div>
                      <Header attached = "top"> 👤 {activeContent.name}</Header>
                      <Segment attached content = {activeContent.story}/>
                    </div>
              )}
              </div>
          <div className = "sidebar-content">
          <Segment>
              {/* world events */}
              {(props.world && activeContent == props.world)?(
                    activeContent.characters.map((character) => {
                    if (character.events){
                      return character.events.map((event)=> {
                        return (<div key = {event._id}>
                            <Header as='h2' attached='top'>
                            <Label color='blue' ribbon> Event </Label>
                                {event.title}
                            </Header>
                            <Segment attached>
                                {event.text}
                            </Segment>
                        </div>)
                        
                      })
                    }
                  }
                    )
              ): (null)}
              {/* world posts */}
              {(props.world && activeContent == props.world)?(
                    activeContent.characters.map((character) => {
                    if (character.posts){
                      return character.posts.map((post)=> {
                        return (<div key = {post._id}>
                            <Header as='h2' attached='top'>
                            <Label color='orange' ribbon> Post </Label>
                                {post.title}
                            </Header>
                            <Segment attached>
                                <strong><i> posted by {post.character.name}</i> </strong><br /><br />
                                {post.text}
                            </Segment>
                        </div>)
                        
                      })
                    }
                  }
                    )
              ):(
                (activeContent.posts)?(
                  activeContent.posts.map((post)=>{
                    return (<div key = {post._id}>
                      <Header as='h2' attached='top'>
                          {post.title}
                      </Header>
                      <Segment attached>
                          {post.text}
                      </Segment>
                  </div>)
                  })
                ):(null)
              )
            }
          </Segment>
          </div>
        </Grid.Column>
      </Grid>
    )
}

export default SideBar;