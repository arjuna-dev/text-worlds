import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { getWorldQuery } from "../../../queries/queries";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import WorldInteraction from "../WorldInteraction";
jest.mock("jwt-decode", () => jest.fn());

describe("World Interaction", () => {
  it("should render world interaction without crashing", async () => {
    const worldDetailMock = [
      {
        request: {
          query: getWorldQuery,
        },
        result: {
          data: {
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
          },
        },
      },
    ];

    jwt_decode.mockImplementationOnce(() => ({
      _id: "1",
      name: "test",
      email: "test@test.com",
      iat: 23523523,
      exp: 123423523,
    }));

    render(
      <BrowserRouter>
        <MockedProvider mocks={worldDetailMock} addTypename={false}>
          <WorldInteraction />
        </MockedProvider>
      </BrowserRouter>
    );

    const worldDetailElement = await screen.findByTestId("world-item-1");

    expect(worldDetailElement).toBeInTheDocument();
  });
});
