import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getWorldQuery } from '../../queries/queries';
import { List, Container } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import BackNavigation from '../BackNavigation';
import PostBox from './PostBox';
import SideBar from './SideBar';

const WorldGraph = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
    });
    console.log('working');
    if (loading) return <div className="ui active centered loader"></div>
    if (error) return <div>Error :( Try again later</div>;
    console.log(data);
    let myCharacterId;
    let redirect = true;
    data.world.characters.map((character) => {
        if (localStorage.usertoken && character.userId === jwt_decode(localStorage.usertoken)._id){
            myCharacterId = character._id;
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
            <SideBar world = {data.world} />
        </div>
        <div className = "post-box">
            <PostBox world = {data.world} myCharacterId = {myCharacterId}/>
        </div>
        
    </div>
    );
}

export default WorldGraph;