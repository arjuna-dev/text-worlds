import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getWorldQuery } from "../../queries/queries";
import BackNavigation from "../Helpers/BackNavigation";
import jwt_decode from "jwt-decode";
import _ from "lodash";
import WorldSummaryBox from "./WorldSummaryBox";
import WorldDetailNavigation from "./WorldDetailNavigation";

function check_if_user_already_joined_world(worldDetailsData) {
  let userLoggedInToken = localStorage.usertoken;
  worldDetailsData.world.characters.map((character) => {
    if (
      userLoggedInToken &&
      character.userId === jwt_decode(userLoggedInToken)._id
    ) {
      return true;
    }
  });
  return false;
}

function getWorldDetails(worldId) {
  return useQuery(getWorldQuery, {
    variables: { id: worldId },
  });
}

const WorldHomepage = (props) => {
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
      <WorldDetailNavigation worldDetailsData={worldDetailsData} />
    </div>
  );
};

export default WorldHomepage;
