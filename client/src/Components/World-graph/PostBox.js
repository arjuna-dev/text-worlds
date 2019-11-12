import React from 'react';
import {Tab} from 'semantic-ui-react';
import PostForm from './PostForm';

const PostBox = () => {
    const panes = [
        {
            menuItem: '...',
            render: () => <Tab.Pane attached='top'>Switch to write a post or create an event</Tab.Pane>,
          },
        {
          menuItem: 'Write a post',
          render: () => <Tab.Pane attached='top'>
              <PostForm />
          </Tab.Pane>,
        },
        {
          menuItem: 'Create a major event',
          render: () => <Tab.Pane attached='top'>Tab 2 Content</Tab.Pane>,
        },
    ]
    return <div className = "post-box"><Tab menu={{ attached: 'bottom'}} panes={panes} /></div>
}

export default PostBox;