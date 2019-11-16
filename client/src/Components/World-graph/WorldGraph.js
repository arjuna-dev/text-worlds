import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getWorldQuery } from '../../queries/queries';
import { List, Segment } from 'semantic-ui-react'
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
        <div class="ui grid">
            <div class="two wide column"></div>
            <div class="twelve wide column">
                <Segment raised className = "segmento">
                    <List className = "graph-list">
                        {/* World-title-graph */}
                        <div className = 'item-row'>
                            <List.Item icon='map' content= {data.world.name} className = "row-title"/>
                            {data.world.events.map((event) => {
                                return <Popup
                                content={event.text}
                                key={event._id}
                                header={event.title}
                                trigger={<div className = "graph-item"><Image src={p1} avatar /></div>}
                            />
                            })}
                            {data.world.characters.map((character)=> (
                            character.posts.map((post) => {
                                let header = post.title + '  (by ' + post.character.name + ')'
                                return <Popup
                                content={post.text}
                                key={post._id}
                                header={header}
                                trigger={<div className = "graph-item"><Image src={p2} avatar /></div>}
                            />
                            
                            })
                            ))}
                        </div>
                        {/* World-character-graph */}
                        {data.world.characters.map((character) => {
                            return (
                                <div className = 'item-row'>
                                    <List.Item key = {character._id} icon = "user" content = {character.name} className = "row-title"/>
                                    {
                                        character.posts.map((post) =>{
                                        return <Popup
                                        content={post.text}
                                        key={post._id}
                                        header={post.title}
                                        trigger={<div className = "graph-item"><Image src={p2} avatar /></div>}
                                    />
                                    })}
                                </div>
                            )
                        })}
                        {data.world.characters.map((character)=> (
                            character.places.map((place) => (
                                <List.Item key = {place._id} icon = "marker" content = {place.name} className = "row-title"/>
                            ))
                        ))}
                    </List>
                </Segment>
            </div>
            <div class="two wide column"></div>
        </div>
    </div>
    );
}

export default WorldGraph;