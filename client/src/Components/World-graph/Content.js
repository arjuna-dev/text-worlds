import React from 'react'
import { Accordion } from 'semantic-ui-react'

const Content = (props) => {
    let panesPost = [];
    if (props.posts){
        props.posts.map((post) => {
            panesPost.push({
                key: post._id,
                title: post.title,
                content: <div>{post.text}</div>,
            })
            return
        })
    }
    return <Accordion defaultActiveIndex={0} panels={panesPost} />
}

export default Content