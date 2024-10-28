/**
 * Configuration object containing the authentication service API endpoints
 */
const jwtServiceConfig = {
	signIn: 'v1/sign-in',
	// signIn: 'api/auth/sign-in',
	signUp: 'api/auth/sign-up',
	accessToken: 'v1/auth/access-token',
	updateUser: 'api/auth/user/update'
};

export default jwtServiceConfig;
