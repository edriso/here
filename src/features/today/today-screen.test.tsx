import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TodayScreen } from './today-screen';

describe('TodayScreen', () => {
  it('suggests the child played with least recently and lists everyone', () => {
    render(
      <MemoryRouter>
        <TodayScreen />
      </MemoryRouter>,
    );

    // The seed has Mia (2 days ago) and Noah (5 days ago), so Noah is overdue.
    // (Both the hero CTA and the status row offer "Start with Noah".)
    expect(screen.getAllByRole('button', { name: 'Start with Noah' }).length).toBeGreaterThan(0);
    // Both children appear in the "Today" status list.
    expect(screen.getAllByText('Mia').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Noah').length).toBeGreaterThan(0);
  });
});
