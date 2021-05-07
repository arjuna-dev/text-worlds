import '@testing-library/jest-dom/extend-expect'
import 'jest-canvas-mock';
import React from 'react'
import { render, screen } from '@testing-library/react';
import {act} from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { getAllWorlds } from '../../queries/queries';
import WorldList from './WorldList';

const wait = require('waait');

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

  await wait(0); // wait for response
  
  expect(screen.getByText('Test')).toBeInTheDocument();
});