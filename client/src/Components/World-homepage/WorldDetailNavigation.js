import React, { useState } from "react";
import { Header, Icon, Menu, List, Label } from "semantic-ui-react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import ReadMore from "../Helpers/ReadMore";
import _ from "lodash";

const WorldDetailNavigation = (props) => {
  const [activeItem, setActiveItem] = useState("World Timeline");
  const [activeContent, setActiveContent] = useState("World Timeline");
  return (
    <div className="world">
      <Menu pointing secondary>
        <Menu.Item
          active={activeItem === "World Timeline"}
          onClick={(e) => {
            setActiveItem("World Timeline");
            setActiveContent("World Timeline");
          }}
        >
          <Header as="h3">
            <Icon name="history" />
            World Timeline
          </Header>
        </Menu.Item>
        <Menu.Item
          active={activeItem === "All characters"}
          onClick={(e) => {
            setActiveItem("All characters");
            setActiveContent("All characters");
          }}
        >
          <Header as="h3">
            <Icon name="users" />
            All Characters ({_.size(props.worldDetailsData.world.characters)})
          </Header>{" "}
        </Menu.Item>
      </Menu>
      {activeContent === "World Timeline" ? (
        <Timeline lineColor={"#ddd"}>
          {props.worldDetailsData.world.posts.map((post) => {
            if (post.type === "Event") {
              return (
                <TimelineItem
                  key={post._id}
                  dateText={post.dateCreated}
                  style={{ color: "#e86971" }}
                >
                  <h2>{post.title}</h2>
                  <span style={{ fontSize: "18px" }}>
                    <ReadMore line={2}>{post.text}</ReadMore>
                  </span>
                </TimelineItem>
              );
            } else {
              return null;
            }
          })}
        </Timeline>
      ) : (
        <List celled>
          {props.worldDetailsData.world.characters.map((character) => {
            console.log(character);
            return (
              <List.Item key={character._id} style={{ fontSize: "20px" }}>
                <Icon name="user" />
                <List.Content>
                  <List.Header>{character.name}</List.Header>
                  <ReadMore line={2}>{character.story}</ReadMore>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default WorldDetailNavigation;
