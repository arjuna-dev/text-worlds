import React, { useState, useEffect} from 'react'
import { Grid, Menu, Segment, Header, Label,Modal, Form,TextArea, Button, Icon} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import { deletePostMutation, getWorldQuery } from '../../queries/queries';
import jwt_decode from 'jwt-decode'
import Reaction from './Reaction';
import ReadMore from '../ReadMore';
import BackNavigation from '../BackNavigation';
import PostForm from './PostForm';
import EventForm from './EventForm'
import { set } from 'mongoose';

const SideBar = (props) => {

    const [activeItem, setActiveItem] = useState(props.world.name);
    const [activeContent, setActiveContent] = useState(props.world);
    const [deletePost] = useMutation(deletePostMutation);
    const [showModalPost, setShowModalPost] = useState(false);
    const [showModalEvent, setShowModalEvent] = useState(false);

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
    function closeModalPost(){
      setShowModalPost(false);
    }
    function closeModalEvent(){
      setShowModalEvent(false);
    }

    return (
      <Grid>
        <Grid.Column width = {3}>
        <BackNavigation />
          <div className = "sidebar">
          <Menu fluid vertical tabular>
              <Menu.Item         
                key={props.world._id}
                active={activeItem === props.world.name}
                onClick={(e) => {setActiveItem(props.world.name); setActiveContent(props.world);}}
              ><div style = {{fontSize: "18px"}}><Icon name = "bolt" /> All activities </div></Menu.Item>
              <h4>Characters</h4>

              {/* My character */}
              {props.world.characters.map((character) => {
                return (character.userId === jwt_decode(localStorage.usertoken)._id)?
                (
                  <Menu.Item
                      name = {character.name}
                      key = {character._id}
                      active={activeItem === character.name}
                      onClick={(e) => {setActiveItem(character.name); setActiveContent(character);}}
                  >
                  <div><Icon name = "user" /> {character.name + " (you)"}</div>
                  </Menu.Item>
              ):null
                
            })}

              {/* other characters */}
            {props.world.characters.map((character) => {
                return (character.userId === jwt_decode(localStorage.usertoken)._id)?
                null:(
                  <Menu.Item
                      name = {character.name}
                      key = {character._id}
                      active={activeItem === character.name}
                      onClick={(e) => {setActiveItem(character.name); setActiveContent(character);}}
                  >
                  <div><Icon name = "user" /> {character.name}</div>
                  </Menu.Item>
              )
            })}
          </Menu>
          </div>
        </Grid.Column>

        <Grid.Column stretched width={13}>
          {/* {world/character description} */}
          <div className = "sidebar-header">
              {activeContent===props.world?(
                    <div>
                      <Header  attached = "top" style = {{fontSize: "1.2em"}}> <Icon name = "world" />&nbsp;{activeContent.name} </Header>
                      <Segment attached style = {{fontSize: "1em"}}> <strong>ABOUT THE WORLD: </strong><br></br><ReadMore>{activeContent.description}</ReadMore> </Segment>
                    </div>
                  ):(
                    <div>
                      <div><Header attached = "top"style = {{fontSize: "1.2em"}}> <Icon name = "user" />&nbsp;{activeContent.name}  </Header></div>
                      <div><Segment attached style = {{fontSize: "1em"}}> <strong>ABOUT ME: </strong><br></br><ReadMore>{activeContent.story} </ReadMore></Segment></div>
                    </div>
              )}
              </div>


              {/* write a post /create a timeline buttons */}
              <div className = "create-action">
              <Button.Group size='large'>
                <Modal closeIcon onClose={() => closeModalPost()} open={showModalPost}  trigger = {<Button onClick = {() => setShowModalPost(true)}> Write as your character</Button>} >
                  <Header content='Write as your character' />
                  <Modal.Content>
                    <PostForm world = {props.world} myCharacterId = {props.myCharacterId} closeModal = {closeModalPost}/>
                  </Modal.Content>
                </Modal>
                <Button.Or />
                <Modal trigger = {<Button onClick = {() => setShowModalEvent(true)}> Write a world timeline </Button>} closeIcon onClose={() => closeModalEvent()} open={showModalEvent}>
              <Header content='Write a world timeline' />
              <Modal.Content>
                <EventForm world = {props.world} myCharacterId = {props.myCharacterId} closeModal = {closeModalEvent}/>
              </Modal.Content>
              </Modal>
              </Button.Group>
              </div>


              {/* Main content based on the menu */}
          <div className = "sidebar-content">
          <Segment>
              {/* world-all-events */}
              {(activeContent === props.world)?(
                    activeContent.posts.map((post) => {
                    console.log('yaayyeyeee');
                    if (post.type === 'Event'){
                        return (<div key = {post._id}>
                            <Header as='h2' attached='top' className = "event-header">
                                <Label color='blue' ribbon> World <br /> Timeline </Label>
                                {post.title}
                                {/* added reaction */}
                                <Reaction post = {post} worldId = {props.world._id} myCharacterId = {props.myCharacterId}/>
                            </Header>
                            <Segment attached>
                                <strong><em>Happened on {post.dateCreated}</em></strong><br/><br />
                                <span style = {{fontSize: "1.3em"}}><ReadMore line = {2}>{post.text}</ReadMore></span>
                            </Segment>
                        </div>)  
                    }
                    else{
                      // world-all-posts
                      return (<div key = {post._id}>
                        <Header as='h2' attached='top'>
                        <Label color='orange' ribbon> Character <br /> Narration </Label>
                            {post.title}
                        </Header>
                        <Segment attached>
                            <strong><em>posted by {post.character.name} <br /> on {post.dateCreated}</em></strong><br/><br />
                            <span style = {{fontSize: "1.3em"}}><ReadMore line = {2}>{post.text}</ReadMore></span>
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
                      {post.type === "Post"?
                      <div>
                      <Header as='h2' attached='top' className = "header-char-post">
                          {post.title}
                          {/* post delete functionality only if its user's post */}
                          {(post.character.userId === jwt_decode(localStorage.usertoken)._id)?<div><Button className = "delete-button" icon='delete' onClick = {() => handleClick(post._id)} /></div>: null}
                      </Header>
                      <Segment attached>
                          <strong><em>Posted on {post.dateCreated}</em></strong><br/><br />
                          <span style = {{fontSize: "1.3em"}}><ReadMore>{post.text}</ReadMore></span>
                      </Segment>
                      </div>: null
                      }
                      {/* for event */}
                      {post.type === "Event" && post.character.userId === jwt_decode(localStorage.usertoken)._id?
                      <div>
                      <Header as='h2' attached='top' className = "header-char-post">
                          {post.title} <span style = {{color:"grey", fontSize: "0.9em"}}>(only visible to you)</span>
                          <div><Button className = "delete-button" icon='delete' onClick = {() => handleClick(post._id)} /></div>
                      </Header>
                      <Segment attached>
                          <strong><em>Created on {post.dateCreated}</em></strong><br/><br />
                          <span style = {{fontSize: "1.3em"}}><ReadMore>{post.text} </ReadMore></span>
                      </Segment>
                      </div>: null
                      }

                      
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