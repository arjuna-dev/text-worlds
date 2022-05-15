import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//npimport { renderHook } from "@testing-library/react-hooks";
import Header from '../Header.js'

describe ('Header', () => {
    test ('successfully log out the user', () => {
        //arrange
        localStorage.setItem('usertoken', 'test')
        const { getByTestId } = render(<Header />);

        //act
        fireEvent.click(getByTestId('logout-button'));
        const { getByText } = render(<Header />);

        //assert
        expect(getByText(/Log in/i)).toBeInTheDocument();
    })
})