import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import ReadMore from "../Helpers/ReadMore";

const DescriptionBox = (props) => {
  return (
    <div className="sidebar-header">
      {props.activeContent === props.world ? (
        <div>
          <Header attached="top" style={{ fontSize: "1.2em" }}>
            {" "}
            <Icon name="world" />
            &nbsp;{props.activeContent.name}{" "}
          </Header>
          <Segment attached style={{ fontSize: "1em" }}>
            {" "}
            <strong>ABOUT THE WORLD: </strong>
            <br></br>
            <ReadMore>{props.activeContent.description}</ReadMore>{" "}
          </Segment>
        </div>
      ) : (
        <div>
          <div>
            <Header attached="top" style={{ fontSize: "1.2em" }}>
              {" "}
              <Icon name="user" />
              &nbsp;{props.activeContent.name}{" "}
            </Header>
          </div>
          <div>
            <Segment attached style={{ fontSize: "1em" }}>
              {" "}
              <strong>ABOUT ME: </strong>
              <br></br>
              <ReadMore>{props.activeContent.story} </ReadMore>
            </Segment>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
