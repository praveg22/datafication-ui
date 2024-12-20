import lazyWithReducer from 'app/store/lazyWithReducer';
import PowerBIReport from 'src/app/main/dashboards/analytics/powerbi-report/PowerBIReport';
import reducer from './store';

const AnalyticsDashboardApp = lazyWithReducer(
	'analyticsDashboardApp',
	() => import('./AnalyticsDashboardApp'),
	reducer
);

/**
 * The analytics dashboard app config.
 */
const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'dashboards/analytics',
			element: <AnalyticsDashboardApp />
		},
		{
			path: 'dashboards/analytics/report',
			element: <PowerBIReport />
		}
	]
};

export default AnalyticsDashboardAppConfig;
