import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getWorldQuery } from '../../queries/queries';
import { List, Container } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import BackNavigation from '../BackNavigation';
import PostBox from './PostBox';

const WorldGraph = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
    });
    let myCharacterId;
    console.log('working');
    if (loading) return <div className="ui active centered loader"></div>
    if (error) return <div>Error :( Try again later</div>;
    console.log(data);
    
    let redirect = true;
    data.world.characters.map((character) => {
        if (localStorage.usertoken && character.userId === jwt_decode(localStorage.usertoken)._id){
            redirect = false;
        }
        return;
    })
    
    if (redirect){
        return <Redirect to = '/' />
    }
    let panesWorld = [];

    //world-events
    data.world.events.map((event) => {
        panesWorld.push({
            menuItem: '[EVENT]  ' + event.title,
            render: () => <div className = "container-text"><Tab.Pane key = {event._id} attached={false}><Container text>{event.text}</Container></Tab.Pane></div>,
        })
        return
    })
    //world-events/posts
    data.world.characters.map((character)=> (
    character.posts.map((post) => {
        let header = '[POST]  ' + post.title;
        panesWorld.push({
            menuItem: header,
            render: () => <div className = "container-text"><Tab.Pane key = {post._id} attached={false} className = "container-text"><Container text><em>Posted by <strong>{post.character.name}</strong></em><br /> <br />{post.text}</Container></Tab.Pane></div>,
        })
        return
    })
    ))

    
        

    return (
    <div>
        <BackNavigation />
        <div className = "world-graph">
            <List>
                {/* World-title-graph */}
                <div className = 'linked-world-title'>
                    <List.Item icon='map' content= {data.world.name} className = "world-graph-items world-graph-title"/>
                    <div className = "tab"><Tab  menu={{ secondary: true, pointing: true }} panes={panesWorld} /></div>
                </div>
                {/* World-character-graph */}
                {data.world.characters.map((character) => {
                    if (character.userId === jwt_decode(localStorage.usertoken)._id){
                        myCharacterId = character._id;
                    }
                    let paneCharacters = [];
                    character.posts.map((post) => {
                        paneCharacters.push({
                            menuItem: post.title,
                            render: () => <div><div className = "container-text"><Tab.Pane attached={false}><Container text>{post.text}</Container></Tab.Pane></div></div>,
                        })
                        return
                    })
                    return (
                        <div className = "linked-world-characters" key = {character._id}>
                            <List.Item key = {character._id} icon = "user" content = {character.name} className = "world-graph-items"/>
                            <div className = "tab" ><Tab  menu={{ secondary: true, pointing: true }} panes={paneCharacters} /></div>
                        </div>
                    )
                })}
        
                {data.world.characters.map((character)=> (
                    character.places.map((place) => (
                        <List.Item key = {place._id} icon = "marker" content = {place.name} className = "world-graph-items"/>
                    ))
                ))}
            </List>
        </div>
        <div className = "post-box">
            <PostBox world = {data.world} myCharacterId = {myCharacterId}/>
        </div>
    </div>
    );
}

export default WorldGraph;