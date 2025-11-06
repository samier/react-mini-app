import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ListPage from '@/pages/ListPage';

// Wrapper component to provide Router context
function Wrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('ProjectsList', () => {
  it('renders the list of projects', () => {
    const { getByRole, getByText } = render(<ListPage />, { wrapper: Wrapper });

    // Check if the main heading is rendered
    expect(getByRole('heading', { name: /projects/i })).toBeInTheDocument();

    // Check if projects are rendered
    expect(getByText('Website Redesign')).toBeInTheDocument();
    expect(getByText('Mobile App Development')).toBeInTheDocument();
  });

  it('filters projects based on search input', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText, queryByText } = render(<ListPage />, { wrapper: Wrapper });

    // Get the search input
    const searchInput = getByRole('searchbox', { name: /search projects/i });

    // Type in the search box
    await user.type(searchInput, 'website');

    // Check that only matching project is visible
    expect(getByText('Website Redesign')).toBeInTheDocument();

    // Check that non-matching projects are not visible
    expect(queryByText('Mobile App Development')).not.toBeInTheDocument();
  });

  it('shows empty state when no projects match search', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<ListPage />, { wrapper: Wrapper });

    const searchInput = getByRole('searchbox', { name: /search projects/i });

    // Search for something that doesn't exist
    await user.type(searchInput, 'nonexistent project xyz');

    // Check for empty state message
    expect(getByText(/no projects found/i)).toBeInTheDocument();
    // The text is split across elements, so check for parts of it
    expect(getByText(/no projects match/i)).toBeInTheDocument();
    expect(getByText(/nonexistent project xyz/i)).toBeInTheDocument();
  });

  it('displays correct project count', () => {
    const { getByText } = render(<ListPage />, { wrapper: Wrapper });

    // Should show all 6 projects initially
    expect(getByText(/6 projects/i)).toBeInTheDocument();
  });

  it('project cards have proper accessibility attributes', () => {
    const { getAllByRole } = render(<ListPage />, { wrapper: Wrapper });

    // Get all project cards (they have role="button" from ProjectCard)
    const projectCards = getAllByRole('button').filter(card =>
      card.getAttribute('aria-label')?.includes('View details')
    );

    // Check that each project card has an accessible label
    expect(projectCards.length).toBeGreaterThan(0);
    projectCards.forEach((card) => {
      expect(card).toHaveAttribute('aria-label');
      expect(card.getAttribute('aria-label')).toMatch(/View details for/);
    });
  });

  it('renders project details correctly', () => {
    const { getByRole, getByText, getAllByText } = render(<ListPage />, { wrapper: Wrapper });

    // Find the Website Redesign project card
    const projectCard = getByRole('button', { name: /view details for website redesign/i });

    // Check that it contains expected information using getByText from the main render
    expect(getByText('Website Redesign')).toBeInTheDocument();
    expect(getByText(/complete overhaul/i)).toBeInTheDocument();
    expect(getByText('65%')).toBeInTheDocument();
    // Note: Priority is not shown on the card, only on the detail page
    // The card shows status badge instead - check that at least one "Active" badge exists
    expect(getAllByText(/Active/i).length).toBeGreaterThan(0);
  });
});
