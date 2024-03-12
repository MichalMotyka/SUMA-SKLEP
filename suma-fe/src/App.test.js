import { render, screen } from '@testing-library/react';
import App from './App';
import Order from './components/pages/order/Order';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



test('renders Order component', () => {
  render(<Order />);
  const linkElement = screen.getByText(/order/i);
  expect(linkElement).toBeInTheDocument();
});