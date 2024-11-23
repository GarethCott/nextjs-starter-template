// !STARTERCONF You should delete this page

import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('~/svg/Logo.svg', () => ({
  __esModule: true,
  default: function Logo() {
    return <div data-testid='mock-logo'>Logo</div>;
  },
}));

describe('Homepage', () => {
  it('renders the main components', () => {
    render(<HomePage />);

    // Check for main heading
    const heading = screen.getByText('Next.js Starter Template');
    expect(heading).toBeInTheDocument();

    // Check for description text
    const description = screen.getByText(/A modern starter template/i);
    expect(description).toBeInTheDocument();

    // Check for navigation links
    const componentsLink = screen.getByRole('link', {
      name: /view components/i,
    });
    const docsLink = screen.getByRole('link', { name: /documentation/i });
    expect(componentsLink).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();

    // Check for logo
    const logo = screen.getByTestId('mock-logo');
    expect(logo).toBeInTheDocument();

    // Check for data table
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
