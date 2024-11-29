import FuseLoading from '@fuse/core/FuseLoading';
import FuseUtils from '@fuse/utils';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import settingsConfig from 'app/configs/settingsConfig';
import { Navigate } from 'react-router-dom';
import Error404Page from '../main/404/Error404Page';
import AppsConfigs from '../main/apps/appsConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import DashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import DocumentationConfig from '../main/documentation/DocumentationConfig';
import PagesConfigs from '../main/pages/pagesConfigs';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import UserInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';

const routeConfigs: FuseRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	DocumentationConfig,
	...PagesConfigs,
	...UserInterfaceConfigs,
	...DashboardsConfigs,
	...AppsConfigs,
	...authRoleExamplesConfigs
];

// console.log('SignInConfig', SignInConfig);

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/dashboards/analytics" />,
		// element: <Navigate to="/dashboards/project" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
