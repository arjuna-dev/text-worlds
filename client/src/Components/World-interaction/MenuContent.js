import React, { useState } from "react";
import { Segment, Header, Label, Button } from "semantic-ui-react";
import ReadMore from "../Helpers/ReadMore";
import Reaction from "./Reaction";
import { useMutation } from "@apollo/react-hooks";
import { deletePostMutation } from "../../queries/queries";

function deletePost(postId) {
  const [deletePost] = useMutation(deletePostMutation);
  return deletePost({
    variables: {
      id: postId,
    },
    refetchQueries: [
      { query: getWorldQuery, variables: { id: props.world._id } },
    ],
  });
}

const MenuContent = (props) => {
  return (
    <div className="sidebar-content">
      <Segment>
        {props.activeContent === props.world
          ? props.activeContent.posts.map((post) => {
              if (post.type === "Event") {
                return (
                  <div key={post._id}>
                    <Header as="h2" attached="top" className="event-header">
                      <Label color="blue" ribbon>
                        {" "}
                        World <br /> Timeline{" "}
                      </Label>
                      {post.title}
                      <Reaction
                        post={post}
                        worldId={props.world._id}
                        myCharacterId={props.myCharacterId}
                      />
                    </Header>
                    <Segment attached>
                      <strong>
                        <em>Happened on {post.dateCreated}</em>
                      </strong>
                      <br />
                      <br />
                      <span style={{ fontSize: "1.3em" }}>
                        <ReadMore line={2}>{post.text}</ReadMore>
                      </span>
                    </Segment>
                  </div>
                );
              } else {
                // world-all-posts
                return (
                  <div key={post._id}>
                    <Header as="h2" attached="top">
                      <Label color="orange" ribbon>
                        {" "}
                        Character <br /> Post{" "}
                      </Label>
                      {post.title}
                    </Header>
                    <Segment attached>
                      <strong>
                        <em>
                          posted by {post.character.name} <br /> on{" "}
                          {post.dateCreated}
                        </em>
                      </strong>
                      <br />
                      <br />
                      <span style={{ fontSize: "1.3em" }}>
                        <ReadMore line={2}>{post.text}</ReadMore>
                      </span>
                    </Segment>
                  </div>
                );
              }
            })
          : // character-filter-posts
          props.activeContent.posts
          ? props.activeContent.posts.map((post) => {
              return (
                <div key={post._id}>
                  {post.type === "Post" ? (
                    <div>
                      <Header
                        as="h2"
                        attached="top"
                        className="header-char-post"
                      >
                        {post.title}
                        {/* post delete functionality only if its user's post */}
                        {post.character.userId === props.loggedInUserId ? (
                          <div>
                            <Button
                              className="delete-button"
                              icon="delete"
                              onClick={() => deletePost(post._id)}
                            />
                          </div>
                        ) : null}
                      </Header>
                      <Segment attached>
                        <strong>
                          <em>Posted on {post.dateCreated}</em>
                        </strong>
                        <br />
                        <br />
                        <span style={{ fontSize: "1.3em" }}>
                          <ReadMore>{post.text}</ReadMore>
                        </span>
                      </Segment>
                    </div>
                  ) : null}
                  {post.type === "Event" &&
                  post.character.userId === props.loggedInUserId ? (
                    <div>
                      <Header
                        as="h2"
                        attached="top"
                        className="header-char-post"
                      >
                        {post.title}{" "}
                        <span style={{ color: "grey", fontSize: "0.9em" }}>
                          (only visible to you)
                        </span>
                        <div>
                          <Button
                            className="delete-button"
                            icon="delete"
                            onClick={() => deletePost(post._id)}
                          />
                        </div>
                      </Header>
                      <Segment attached>
                        <strong>
                          <em>Created on {post.dateCreated}</em>
                        </strong>
                        <br />
                        <br />
                        <span style={{ fontSize: "1.3em" }}>
                          <ReadMore>{post.text} </ReadMore>
                        </span>
                      </Segment>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </Segment>
    </div>
  );
};

export default MenuContent;
