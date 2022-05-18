import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import _ from "lodash";
import BackNavigation from "../Helpers/BackNavigation";
import ActivityButtons from "./ActivityButtons";
import SideMenu from "./SideMenu";
import DescriptionBox from "./DescriptionBox";
import MenuContent from "./MenuContent";

const WorldInteractionContent = (props) => {
  const [activeItem, setActiveItem] = useState(props.world.name);
  const [activeContent, setActiveContent] = useState(props.world);

  useEffect(() => {
    setActiveItem(props.world.name);
    setActiveContent(props.world);
  }, [props.world]);

  return (
    <Grid>
      <Grid.Column width={3}>
        <BackNavigation />
        <SideMenu
          world={props.world}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setActiveContent={setActiveContent}
        />
      </Grid.Column>

      <Grid.Column stretched width={13}>
        <DescriptionBox activeContent={activeContent} />

        <ActivityButtons
          world={props.world}
          myCharacterId={props.myCharacterId}
        />

        <MenuContent
          world={props.world}
          myCharacterId={props.myCharacterId}
          activeContent={activeContent}
          loggedInUserId={props.loggedInUserId}
        />
      </Grid.Column>
    </Grid>
  );
};

export default WorldInteractionContent;
