import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import '@mock-api';
import settingsConfig from 'app/configs/settingsConfig';
import { useAppSelector } from 'app/store';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUserRole } from 'app/store/user/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constants';
import rtlPlugin from 'stylis-plugin-rtl';
import { AuthProvider } from './auth/AuthContext';
import withAppProviders from './withAppProviders';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The user object from the Redux store.
	 */
	const userRole = useAppSelector(selectUserRole);

	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useSelector(selectCurrentLanguageDirection);

	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);

	return (
		<CacheProvider value={createCache(emotionCacheOptions[langDirection] as Options)}>
			<FuseTheme
				theme={mainTheme}
				direction={langDirection}
			>
				<AuthProvider>
					<BrowserRouter>
						<FuseAuthorization
							userRole={userRole}
							loginRedirectUrl={settingsConfig.loginRedirectUrl}
						>
							<SnackbarProvider
								maxSnack={5}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}
								classes={{
									containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
								}}
							>
								<FuseLayout layouts={themeLayouts} />
							</SnackbarProvider>
						</FuseAuthorization>
					</BrowserRouter>
				</AuthProvider>
			</FuseTheme>
		</CacheProvider>
	);
}

export default withAppProviders(App);
