import React, {useState, useEffect} from 'react';
import { Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import { updatePostMutation, getWorldQuery } from '../../queries/queries';

const Reaction = (props) => {
    console.log(props)
    const reactions = {
        likes: props.post.likes,
        deletes: props.post.deletes,
        likesCharsId: props.post.likesCharsId || [],
        deletesCharsId: props.post.deletesCharsId || [],
    }
    const [updatePost] = useMutation(updatePostMutation);

    function updateReactions(){
        updatePost({
            variables: {
                id: props.post._id,
                likes: reactions.likesCharsId.length,
                deletes: reactions.deletes,
                likesCharsId: reactions.likesCharsId,
                deletesCharsId: reactions.deletesCharsId
        }, refetchQueries:[{ query: getWorldQuery , variables: {id: props.worldId}}]
        })
    }

    console.log(reactions);
    return (
        <div>
            <Button
            content='Like it'
            icon='thumbs up outline'
            label={{ as: 'a', basic: true, content: reactions.likes }}
            labelPosition='right'
            onClick = {(e) => {
                if (!reactions.likesCharsId || !reactions.likesCharsId.includes(props.myCharacterId)){
                    reactions.likes = props.post.likes + 1
                    reactions.likesCharsId.push(props.myCharacterId)
                    updateReactions()
                }
                else{
                    reactions.likes = props.post.likes - 1
                    let index = reactions.likesCharsId.indexOf(props.myCharacterId)
                    reactions.likesCharsId.splice(index, 1)
                    updateReactions()
                }
            }}
            />
            <Button
            content='Remove it'
            icon='thumbs down outline'
            label={{ as: 'a', basic: true, pointing: 'right', content: reactions.deletes }}
            labelPosition='left'
            onClick = {(e) => {
                if (!reactions.deletesCharsId || !reactions.deletesCharsId.includes(props.myCharacterId)){
                    reactions.deletes = props.post.deletes + 1
                    reactions.deletesCharsId.push(props.myCharacterId)
                    updateReactions()
                }
                else{
                    reactions.deletes = props.post.deletes - 1
                    let index = reactions.deletesCharsId.indexOf(props.myCharacterId)
                    reactions.deletesCharsId.splice(index, 1)
                    updateReactions()
                }
            }}
            />
        </div>
    )
}

export default Reaction;