import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import ReadMore from '../ReadMore';
import { getWorldQuery } from '../../queries/queries';
import ModalPopup from './ModalPopup';
import BackNavigation from '../BackNavigation';
import { Header, Icon, Menu, List, Label} from 'semantic-ui-react';
import jwt_decode from 'jwt-decode'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';

const World = (props) => {

    const [activeItem, setActiveItem] = useState('World Timeline')
    const [activeContent, setActiveContent] = useState('World Timeline');

    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
      });
    if (loading) return <div className="ui active centered loader"></div>
    if (error) return <div>Error :( Try again later</div>;

    let alreadyJoined = false;
    // checking if already joined
    data.world.characters.map((character) => {
        if(character.userId === jwt_decode(localStorage.usertoken)._id){
          alreadyJoined = true;
        }
        return null;
    })

    console.log(data);
    return (
        <div>
            <div style = {{padding: "15px", display: "flex"}}>
            <BackNavigation />
                <div className = "world-title">
                <Header as='h2' icon>
                    <Icon name='world' />
                    
                    {data.world.name}{(alreadyJoined)? <Label color='olive' horizontal>
          Joined
        </Label>: null}
                    <Header.Subheader style = {{fontSize: "0.8em"}}>
                    <ReadMore line = {2}>
                    {data.world.description}
                    </ReadMore>
                    </Header.Subheader>
                </Header>
                        <div className = "join-world"><ModalPopup world = {data.world} /></div>
                </div>
            </div>
            <div className = "world">
                    <Menu pointing secondary>
                        <Menu.Item
                            active={activeItem === 'World Timeline'}
                            onClick={(e) => {setActiveItem("World Timeline"); setActiveContent("World Timeline");}}
                        ><Header as='h3'><Icon name = 'history' />World Timeline</Header></Menu.Item>
                        <Menu.Item
                            active={activeItem === 'All characters'}
                            onClick={(e) => {setActiveItem("All characters"); setActiveContent("All characters");}}
                        ><Header as='h3'><Icon name = 'users' />All Characters</Header> </Menu.Item>
                    </Menu>
                    {(activeContent === "World Timeline")? (
                        <Timeline lineColor = {'#ddd'}>
                            {data.world.posts.map((post)=> {
                                if (post.type === "Event"){
                                return <TimelineItem key = {post._id} dateText = {post.dateCreated} style={{ color: '#e86971' }}>
                                    <h2>{post.title}</h2>
                                    <span style = {{fontSize: "18px"}}><ReadMore line = {2}>
                                        {post.text}
                                    </ReadMore></span>
                                </TimelineItem>
                                }
                                else {
                                    return null
                                }
                            })}
                        </Timeline>
                    ):(
                        // <Card.Group>
                        //     {data.world.characters.map((character)=> (
                        //             <CardEvent character = {character} key = {character._id}/>
                        //     ))}
                        // </Card.Group>
                        <List celled>
                            {data.world.characters.map((character) => 
                                {
                                console.log(character) 
                                return(
                                <List.Item key = {character._id} style = {{fontSize: "20px"}}>
                                    <Icon name = "user" />
                                    <List.Content>
                                        <List.Header>{character.name}</List.Header>
                                        <ReadMore line = {2}>
                                        {character.story}
                                        </ReadMore>
                                    </List.Content>
                                </List.Item>
                                )}
                            )}
                        </List>
                    )}
                    
                    
                {/* <div className = "world-places">
                    <strong>PLACES</strong> <br></br>
                    <div className = "world-elements-inside">
                        {data.world.characters.map((character)=> (
                            character.places.map((place) => (
                                <div key = {place._id}>
                                    <CardEvent place = {place}/>
                                </div>
                            ))
                        ))}
                    </div>
                </div> */}
                </div>
                </div>
    );
}
 
export default World;