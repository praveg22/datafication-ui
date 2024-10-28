// // src/app/main/sign-in/SignInPage.test.tsx

// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import jwtService from '../../auth/services/jwtService';
// import SignInPage from './SignInPage';

// // Mock the jwtService
// jest.mock('../../auth/services/jwtService');

// describe('SignInPage', () => {
// 	beforeEach(() => {
// 		jest.clearAllMocks();
// 	});

// 	it('should display error messages when credentials are wrong', async () => {
// 		// Mock the signInWithEmailAndPassword to reject with an error
// 		jwtService.signInWithEmailAndPassword.mockRejectedValue([
// 			{ type: 'email', message: 'Invalid email' },
// 			{ type: 'password', message: 'Invalid password' },
// 		]);

// 		render(
// 			<Router>
// 				<SignInPage />
// 			</Router>
// 		);

// 		// Simulate user input
// 		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
// 		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

// 		// Simulate form submission
// 		fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

// 		// Wait for error messages to appear
// 		await waitFor(() => {
// 			expect(screen.getByText('Invalid email')).toBeInTheDocument();
// 			expect(screen.getByText('Invalid password')).toBeInTheDocument();
// 		});
// 	});

// 	it('should not display error messages when credentials are correct', async () => {
// 		// Mock the signInWithEmailAndPassword to resolve successfully
// 		jwtService.signInWithEmailAndPassword.mockResolvedValue({});

// 		render(
// 			<Router>
// 				<SignInPage />
// 			</Router>
// 		);

// 		// Simulate user input
// 		fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'admin@fusetheme.com' } });
// 		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin' } });

// 		// Simulate form submission
// 		fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

// 		// Wait for any potential error messages (there should be none)
// 		await waitFor(() => {
// 			expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
// 			expect(screen.queryByText('Invalid password')).not.toBeInTheDocument();
// 		});
// 	});
// });
