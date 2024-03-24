import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceSelector from '../src/components/ServiceSelector';
/* eslint-env jest */
test('renders ServiceSelector component', () => {
  render(<ServiceSelector />);
  expect(
    screen.getByRole('combobox', { name: /select calculation method/i })
  ).toBeInTheDocument();
});
