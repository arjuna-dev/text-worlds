import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock';
import React from 'react'
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { getAllWorlds } from '../../../queries/queries';
import WorldList from '../WorldList';


it('should render world list', async () => {
  const worldMock = [{
    request: {
      query: getAllWorlds,
    },
    result: {
      data: { worlds: [{ _id: 1, name: 'Test', description: 'Testing', userId : 0 } ]},
    },
  }];

  render(
      <MockedProvider mocks={worldMock} addTypename={false}>
        <WorldList />
      </MockedProvider>,
    );

  const worldListElement = await screen.findByTestId("world-item-1")

  expect(worldListElement).toBeInTheDocument();
});