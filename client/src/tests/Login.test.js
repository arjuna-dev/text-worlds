import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import * as React from 'react'
import axios from 'axios'
import LoginForm from '../Components/Forms/Login'


test ('Allows user to log in successfully ', async() => {
    //mocking out axios for the test
    const fakeUserResponse = {data: 'fake_user_token'}
    jest.spyOn(axios, 'post').mockImplementationOnce(() => {
        console.log('saghsadgas')
        return Promise.resolve(fakeUserResponse)
    })
    render (<LoginForm />)
    // fill out the form
    userEvent.type(screen.getByText(/email/i), 'a@b.com')
    userEvent.type(screen.getByText(/password/i), '12345678')
    await(userEvent.click(screen.getByText(/login/i)));
    expect(window.localStorage.getItem('usertoken')).toEqual(fakeUserResponse.data)
})

