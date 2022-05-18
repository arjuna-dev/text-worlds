import React from "react";
import { Menu, Icon } from "semantic-ui-react";

const SideMenu = (props) => {
  return (
    <div className="sidebar">
      <Menu fluid vertical tabular>
        <Menu.Item
          key={props.world._id}
          active={props.activeItem === props.world.name}
          onClick={(e) => {
            props.setActiveItem(props.world.name);
            props.setActiveContent(props.world);
          }}
        >
          <div style={{ fontSize: "18px" }}>
            <Icon name="bolt" /> All activities{" "}
          </div>
        </Menu.Item>
        <h4>Characters</h4>

        {/* My character */}
        {props.world.characters.map((character) => {
          return character.userId === props.loggedInUserId ? (
            <Menu.Item
              name={character.name}
              key={character._id}
              active={props.activeItem === character.name}
              onClick={(e) => {
                props.setActiveItem(character.name);
                props.setActiveContent(character);
              }}
            >
              <div>
                <Icon name="user" /> {character.name + " (you)"}
              </div>
            </Menu.Item>
          ) : null;
        })}

        {/* other characters */}
        {props.world.characters.map((character) => {
          return character.userId === props.loggedInUserId ? null : (
            <Menu.Item
              name={character.name}
              key={character._id}
              active={props.activeItem === character.name}
              onClick={(e) => {
                props.setActiveItem(character.name);
                props.setActiveContent(character);
              }}
            >
              <div>
                <Icon name="user" /> {character.name}
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default SideMenu;
