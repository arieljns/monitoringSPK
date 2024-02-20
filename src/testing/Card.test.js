import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../components/Card';

jest.mock('../hooks/useDataContext', () => ({
    useDataContext: jest.fn(() => ({ dispatch: jest.fn() })),
}));


jest.mock('../interaction/upload', () => jest.fn(() => ({ status: 200 })));

describe('Card Component', () => {
    test('renders without errors', () => {
        render(<Card />);
    });

    test('renders all steps', () => {
        render(<Card />);
        const steps = ['Step 1', 'Step 2', 'Step 3'];
        steps.forEach((step) => {
            expect(screen.getByText(step)).toBeInTheDocument();
        });
    });

    test('handles next button click', () => {
        render(<Card />);
        fireEvent.click(screen.getByText('Selanjutnya'));
    });

    test('handles back button click', () => {
        render(<Card />);
        fireEvent.click(screen.getByText('Kembali'));
    });


});
