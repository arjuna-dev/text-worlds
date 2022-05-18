import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getWorldQuery } from "../../queries/queries";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import SideBar from "./SideBar";

function check_user_character(data, loggedInUserId) {
  data.world.characters.map((character) => {
    if (loggedInUserId && character.userId === loggedInUserId) {
      return character._id;
    }
  });
  return null;
}

const WorldInteraction = (props) => {
  const { loading, error, data } = useQuery(getWorldQuery, {
    variables: { id: props.match?.params.id },
  });
  if (loading) return <div className="ui active centered loader"></div>;
  if (error) return <div>Error :( Try again later</div>;
  let userLoggedInToken = localStorage.usertoken;
  let loggedInUserId = jwt_decode(userLoggedInToken)?._id;
  let myCharacterId = check_user_character(data, loggedInUserId);

  return (
    <div className="world-graph-page">
      <div className="world-graph" data-testid={`world-item-${data.world._id}`}>
        <SideBar
          world={data.world}
          myCharacterId={myCharacterId}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </div>
  );
};

export default WorldInteraction;
