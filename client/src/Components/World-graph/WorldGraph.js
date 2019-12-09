import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getWorldQuery } from '../../queries/queries';
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import SideBar from './SideBar';

const WorldGraph = (props) => {
    const { loading, error, data } = useQuery(getWorldQuery, {
        variables: { id: props.match.params.id },
    });
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
        return null;
    })
    
    if (redirect){
        return <Redirect to = '/' />
    }
       

    return (
    <div className = "world-graph-page">
        {/* <div className = "post-box">
            <PostBox world = {data.world} myCharacterId = {myCharacterId}/>
        </div> */}
        <div className = "world-graph">
            <SideBar world = {data.world} myCharacterId = {myCharacterId} />
        </div>
        
        
    </div>
    );
}

export default WorldGraph;