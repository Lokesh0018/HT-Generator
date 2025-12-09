import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Exams from './Exams';

// Mock window.location.reload as it's called in the component
const originalLocation = window.location;
beforeAll(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
});
afterAll(() => {
  window.location = originalLocation;
});
beforeEach(() => {
  // Clear mock history before each test
  window.location.reload.mockClear();
  // Mock querySelector to check for 'blur' class.
  // This is needed because JSDOM doesn't support layout/styling.
  document.querySelector = jest.fn().mockReturnValue({
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  });
});

describe('Exams Component', () => {
  test('renders the component with initial data and title', () => {
    render(<Exams />);

    // Check for page title
    expect(screen.getByText('Exams Management')).toBeInTheDocument();

    // Check for "Add Subject" button
    expect(screen.getByRole('button', { name: /Add Subject/i })).toBeInTheDocument();

    // Check if the table is rendered with data. The mock data has 10 items.
    const rows = screen.getAllByRole('row');
    // 1 header row + 10 data rows
    expect(rows).toHaveLength(11);

    // Check for a specific subject from the mock data
    expect(screen.getAllByText('Data Structures').length).toBeGreaterThan(0);
  });

  test('opens and closes the "Add Subject" modal', async () => {
    const user = userEvent.setup();
    render(<Exams />);

    // Modal should not be visible initially
    expect(screen.queryByText('Add New Subject')).not.toBeInTheDocument();

    // Click "Add Subject" button to open the modal
    await user.click(screen.getByRole('button', { name: /Add Subject/i }));

    // Modal should now be visible
    expect(screen.getByText('Add New Subject')).toBeInTheDocument();
    expect(document.querySelector).toHaveBeenCalledWith('.examsContent');

    // Click outside the modal to close it
    await user.click(document.body);

    // Modal should be closed
    expect(screen.queryByText('Add New Subject')).not.toBeInTheDocument();
  });

  test('opens the "Edit Exam" modal with correct data', async () => {
    const user = userEvent.setup();
    render(<Exams />);

    // Find all edit icons. We'll click the first one.
    const editButtons = screen.getAllByTestId('edit-icon');
    await user.click(editButtons[0]);

    // "Edit Exam Details" modal should appear
    expect(screen.getByText('Edit Exam Details')).toBeInTheDocument();

    // Check if the inputs are pre-filled with the first row's data
    expect(screen.getByDisplayValue('20CS501')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Data Structures')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-03-15')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10:00')).toBeInTheDocument(); // Start Time
    expect(screen.getByDisplayValue('12:00')).toBeInTheDocument(); // End Time

    // Click outside to close
    await user.click(document.body);
    expect(screen.queryByText('Edit Exam Details')).not.toBeInTheDocument();
  });

  test('opens the "Delete Exam" modal and handles cancel/delete actions', async () => {
    const user = userEvent.setup();
    render(<Exams />);

    // Find all delete icons and click the second one
    const deleteButtons = screen.getAllByTestId('delete-icon');
    await user.click(deleteButtons[1]);

    // "Delete Exam" modal should appear
    expect(screen.getByText('Delete Exam')).toBeInTheDocument();

    // Check if the confirmation message contains the correct subject details
    expect(screen.getByText(/Are you sure you want to delete the exam for/)).toBeInTheDocument();
    expect(screen.getByText('Algorithms')).toBeInTheDocument();
    expect(screen.getByText('2024-03-17')).toBeInTheDocument();

    // Click Cancel button
    await user.click(screen.getByRole('button', { name: /Cancel/i }));

    // Modal should be closed
    expect(screen.queryByText('Delete Exam')).not.toBeInTheDocument();

    // --- Test Delete action ---
    // Re-open the delete modal
    await user.click(deleteButtons[1]);
    expect(screen.getByText('Delete Exam')).toBeInTheDocument();

    // Click Delete button
    await user.click(screen.getByRole('button', { name: /Delete/i }));

    // window.location.reload should have been called
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});