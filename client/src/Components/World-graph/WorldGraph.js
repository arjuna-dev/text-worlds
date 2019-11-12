import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getWorldQuery } from '../../queries/queries';
import { List } from 'semantic-ui-react'
import { Image, Popup } from 'semantic-ui-react'
import p1 from '../../assets/Worlds/p1.png'
import p2 from '../../assets/Worlds/p2.png'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import BackNavigation from '../BackNavigation';

const WorldGraph = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
    });
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

    return (
    <div>
        <BackNavigation />
        <div className = "world-graph">
            <List>
                {/* World-title-graph */}
                <div className = 'linked-world-title'>
                    <List.Item icon='map' content= {data.world.name} className = "world-graph-items world-graph-title"/>
                    {data.world.events.map((event) => {
                        return <Popup
                        content={event.text}
                        key={event._id}
                        header={event.title}
                        trigger={<div className = "graph-item-event"><Image src={p1} avatar /> {event.title}</div>}
                      />
                    })}
                    {data.world.characters.map((character)=> (
                    character.posts.map((post) => {
                        let header = post.title + ' ⟶ ' + post.character.name
                        return <Popup
                        content={post.text}
                        key={post._id}
                        header={header}
                        trigger={<div className = "graph-item-post"><Image src={p2} avatar /> {header}</div>}
                      />
                    
                    })
                    ))}
                </div>
                {/* World-character-graph */}
                {data.world.characters.map((character) => {
                    return (
                        <div className = "linked-world-characters">
                            <List.Item key = {character._id} icon = "user" content = {character.name} className = "world-graph-items"/>
                            {
                                character.posts.map((post) =>{
                                return <Popup
                                content={post.text}
                                key={post._id}
                                header={post.title}
                                trigger={<div className = "graph-item-post"><Image src={p2} avatar /> {post.title}</div>}
                              />
                            })}
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
    </div>
    );
}

export default WorldGraph;