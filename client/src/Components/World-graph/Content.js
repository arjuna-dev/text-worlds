import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const Content = (props) => {
    if (props.posts){
    return props.posts.map((post) =>{
        return (<div>
            <Header as='h2' attached='top'>
                {post.title}
            </Header>
            <Segment attached>
                <strong><i> posted by {post.character.name}</i> </strong><br /><br />
                {post.text}
            </Segment>
        </div>)
    })
    }
    return null
}

export default Content