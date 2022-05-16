import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ReadMore from "../Helpers/ReadMore";
import { getWorldQuery } from "../../queries/queries";
import ModalPopup from "./ModalPopup";
import BackNavigation from "../Helpers/BackNavigation";
import { Header, Icon, Menu, List, Label } from "semantic-ui-react";
import jwt_decode from "jwt-decode";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import _ from "lodash";
import WorldSummaryBox from "./WorldSummaryBox";

function check_if_user_already_joined_world(worldDetailsData) {
  let userLoggedInToken = localStorage.usertoken;
  worldDetailsData.world.characters.map((character) => {
    if (
      userLoggedInToken &&
      character.userId === jwt_decode(userLoggedInToken)._id
    ) {
      return true;
    }
    return false;
  });
}

function getWorldDetails(worldId) {
  return useQuery(getWorldQuery, {
    variables: { id: worldId },
  });
}

const World = (props) => {
  const [activeItem, setActiveItem] = useState("World Timeline");
  const [activeContent, setActiveContent] = useState("World Timeline");

  let worldId = props.match?.params.id;
  const { loading, error, data } = getWorldDetails(worldId);
  if (loading) return <div className="ui active centered loader"></div>;
  if (error) return <div>Error :( Try again later</div>;

  let worldDetailsData = data;
  let userAlreadyJoined = check_if_user_already_joined_world(worldDetailsData);

  return (
    <div data-testid={`world-item-${worldDetailsData.world._id}`}>
      <div style={{ padding: "15px", display: "flex" }}>
        <BackNavigation />
        <WorldSummaryBox
          worldDetailsData={worldDetailsData}
          userAlreadyJoined={userAlreadyJoined}
        />
      </div>
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
              All Characters ({_.size(worldDetailsData.world.characters)})
            </Header>{" "}
          </Menu.Item>
        </Menu>
        {activeContent === "World Timeline" ? (
          <Timeline lineColor={"#ddd"}>
            {worldDetailsData.world.posts.map((post) => {
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
            {worldDetailsData.world.characters.map((character) => {
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
    </div>
  );
};

export default World;
