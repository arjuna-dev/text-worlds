import { Header, Icon, Menu, List, Label } from "semantic-ui-react";
import ModalPopup from "./ModalPopup";
import ReadMore from "../Helpers/ReadMore";

const WorldSummaryBox = (props) => {
  return (
    <div className="world-title">
      <Header as="h2" icon>
        <Icon name="world" />

        {props.worldDetailsData.world.name}
        {props.userAlreadyJoined ? (
          <Label color="olive" horizontal>
            Joined
          </Label>
        ) : null}
        <Header.Subheader style={{ fontSize: "0.8em" }}>
          <ReadMore line={2}>{props.worldDetailsData.world.description}</ReadMore>
        </Header.Subheader>
      </Header>
      <div className="join-world">
        <ModalPopup world={props.worldDetailsData.world} />
      </div>
    </div>
  );
};

export default WorldSummaryBox;
