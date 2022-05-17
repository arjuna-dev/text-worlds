import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";
import React from "react";
import { render, screen } from "@testing-library/react";
import WorldSummaryBox from "../WorldSummaryBox";
import { ApolloProvider } from '@apollo/client';

const worldDetailMock = {
  world: {
    _id: "1",
    name: "Test",
    description: "Testing",
    user: {
      name: "testUser",
      __typename: "User",
    },
    posts: [
      {
        _id: "1",
        title: "test",
        text: "testing",
        type: "Post",
        character: {
          name: "King",
        },
        dateCreated: "Nov 22, 2019 2:47 PM",
        likes: 0,
        deletes: 0,
        likesCharsId: [],
        deletesCharsId: [],
      },
    ],
    characters: [
      {
        _id: "1",
        dateCreated: "Nov 22 2019",
        name: "Paul",
        userId: "1",
        story: "I am a test",
        posts: [],
      },
    ],
  },
};

describe("World summary box view", () => {
  it("should render world summary box with label joined for user who joined", async() => {
    render(
      <ApolloProvider client="client">
        <WorldSummaryBox
          worldDetailsData={worldDetailMock}
          userAlreadyJoined={true}
        />
      </ApolloProvider>
    );

    const worldListElement = await screen.findByTestId("world-item-1");

    expect(worldListElement).toBeInTheDocument;
  });

  it("should render world summary box with label joined for user who hasn't joined", async() => {
    render(
        <ApolloProvider client="client">
        <WorldSummaryBox
          worldDetailsData={worldDetailMock}
          userAlreadyJoined={false}
        />
      </ApolloProvider>
    );

    const worldListElement = await screen.queryByTestId("world-item-1");

    expect(worldListElement).not.toBeInTheDocument;
  });
});
