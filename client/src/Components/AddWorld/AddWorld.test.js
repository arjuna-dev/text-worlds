import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import AddWorld from './AddWorld'
import { MockedProvider } from '@apollo/client/testing';
import WorldList from '../Homepage/WorldList'


describe("Add World", () => {
    test ('Allows user to create a world ', async() => {
        //mocking out axios for the test
        //arrange
        
        localStorage.setItem('usertoken', 'test')
        render (<MockedProvider addTypename={false}><AddWorld /></MockedProvider>)
        // fill out the form
    
        //act
        userEvent.type(screen.getByText(/Name of the world/i), 'test')
        userEvent.type(screen.getByText(/Description of the world/i), 'test')
        //localStorage.removeItem('usertoken')
        await(userEvent.click(screen.getByText(/Create World/i)));
    
        //assert
        expect(screen.getByText('test')).toBeInTheDocument();
    })
})