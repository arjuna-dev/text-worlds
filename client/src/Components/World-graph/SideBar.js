import React, { useState, useEffect} from 'react'
import { Grid, Menu, Segment, Header, Label, List, Button} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import { deletePostMutation, getWorldQuery } from '../../queries/queries';
import jwt_decode from 'jwt-decode'

const SideBar = (props) => {

    const [activeItem, setActiveItem] = useState(props.world.name);
    const [activeContent, setActiveContent] = useState(props.world);
    const [deletePost] = useMutation(deletePostMutation);

    useEffect(() => {
      setActiveItem(props.world.name);
      setActiveContent(props.world)
    },[props.world])

    function handleClick(postId){
      console.log(postId)
      deletePost({
        variables: {
          id: postId
        }, refetchQueries:[{ query: getWorldQuery , variables: {id: props.world._id}}]
      })
    }

    return (
      <Grid>
        <Grid.Column width={4}>
          <div className = "sidebar">
          <Menu fluid vertical tabular>
              <Menu.Item
                
                key={props.world._id}
                active={activeItem === props.world.name}
                onClick={(e) => {setActiveItem(props.world.name); setActiveContent(props.world);}}
              ><List.Item icon='map' content= {props.world.name} /></Menu.Item>
            {props.world.characters.map((character) => {
                return (
                    <Menu.Item
                        name = {character.name}
                        key = {character._id}
                        active={activeItem === character.name}
                        onClick={(e) => {setActiveItem(character.name); setActiveContent(character);}}
                    ><List.Item icon='user' content= {character.name} /></Menu.Item>
                )
            })}
          </Menu>
          </div>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {/* {world/character description} */}
          <div className = "sidebar-header">
              {activeContent===props.world?(
                    <div>
                      <Header  attached = "top"> <List.Item icon='map' content= {activeContent.name} /> </Header>
                      <Segment attached content = {activeContent.description}/>
                    </div>
                  ):(
                    <div>
                      <Header attached = "top"> <List.Item icon='user' content= {activeContent.name} /> </Header>
                      <Segment attached content = {activeContent.story}/>
                    </div>
              )}
              </div>
          <div className = "sidebar-content">
          <Segment>
              {/* world-all-events */}
              {(activeContent === props.world)?(
                    activeContent.posts.map((post) => {
                    console.log('yaayyeyeee');
                    if (post.type === 'Event'){
                        return (<div key = {post._id}>
                            <Header as='h2' attached='top'>
                            <Label color='blue' ribbon> Event </Label>
                                {post.title}
                            </Header>
                            <Segment attached>
                                <strong><em>Happened on {post.dateCreated}</em></strong><br/><br />
                                {post.text}
                            </Segment>
                        </div>)  
                    }
                    else{
                      // world-all-posts
                      return (<div key = {post._id}>
                        <Header as='h2' attached='top'>
                        <Label color='orange' ribbon> Post </Label>
                            {post.title}
                        </Header>
                        <Segment attached>
                            <strong><em>posted by {post.character.name} <br /> on {post.dateCreated}</em></strong><br/><br />
                            {post.text}
                        </Segment>
                    </div>)
                    }
                  }
                    )
              ):(
                // character-filter-posts
                (activeContent.posts)?(
                  activeContent.posts.map((post)=>{
                    return (<div key = {post._id}>
                      <Header as='h2' attached='top'>
                          {post.title}
                          {(post.character.user._id === jwt_decode(localStorage.usertoken)._id)?<Button icon='delete' onClick = {() => handleClick(post._id)} />: null}
                      </Header>
                      <Segment attached>
                          <strong><em>posted on {post.dateCreated}</em></strong><br/><br />
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