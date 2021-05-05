import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import axios from 'axios'
import SignupForm from './Signup'


describe("sign up", () => {
    test ('Allows user to sign up successfully ', async() => {
        //mocking out axios for the test
        //arrange
        const fakeUserResponse = {data: 'fake_user_token'}
        jest.spyOn(axios, 'post').mockImplementationOnce(() => {
            return Promise.resolve(fakeUserResponse)
        })
        render (<SignupForm />)
        // fill out the form
    
        //act
        userEvent.type(screen.getByText(/name/i), 'test')
        userEvent.type(screen.getByText(/email/i), 'a@b.com')
        userEvent.type(screen.getByText('password'), '12345678')
        userEvent.type(screen.getByText(/confirm password/i), '12345678')
        await(userEvent.click(screen.getByText(/Submit/i)));
    
        //assert
        expect(window.localStorage.getItem('usertoken')).toEqual(fakeUserResponse.data)
    })
})
