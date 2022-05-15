import React from 'react';
import { render, screen } from '@testing-library/react';
import BackNavigation from '../BackNavigation';


describe("BackNavigation", () => {
  it("should render back-navigation component", () => {
    const { getByTestId } = render(<BackNavigation />);
    expect(getByTestId('back-navigation-icon').textContent).toBe("Go Back");
  });
});