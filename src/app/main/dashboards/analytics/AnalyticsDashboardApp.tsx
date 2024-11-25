import FuseLoading from '@fuse/core/FuseLoading';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useAppDispatch } from 'app/store';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import RecentTransactionsWidget from 'src/app/main/dashboards/analytics/widgets/RecentTransactionsWidget';
import AnalyticsDashboardAppHeader from './AnalyticsDashboardAppHeader';

const container = {
	show: {
		transition: {
			staggerChildren: 0.06
		}
	}
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

type AnalyticsReportType = {
	data: {
		analyticsReport: AnalyticsReport;
	};
};

export type AnalyticsReport = {
	columns: string[];
	rows: Report[];
};

type Report = {
	reportId: string;
	reportName: string;
	reportDate: string;
	downloadFile: string;
	reportLink: string;
};

// export type WidgetsType = {
// 	[key: string]: unknown;
// };

/**
 * The analytics dashboard app.
 */
function AnalyticsDashboardApp() {
	const dispatch = useAppDispatch();
	const [data, setData] = useState<AnalyticsReport>();
	// const widgets = useAppSelector(selectWidgets);
	// type ReportData = {
	// 	id: number;
	// 	date: string;
	// 	amount: number;
	// 	status: string;
	// };

	// const [data, setData] = useState<ReportData[]>([]);

	useEffect(() => {
		// dispatch(getWidgets());

		async function fetchReports() {
			try {
				const token = localStorage.getItem('jwt_access_token');
				// console.log('token:', token);
				const response = await axios.get('/v1/reports', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				const { data } = (await response.data) as AnalyticsReportType;
				// console.log(')))))', data);
				setData(data?.analyticsReport);
				return data;
			} catch (error) {
				// console.error('Error fetching reports:', error);
				return {};
			}
		}

		fetchReports();

		// if (token) {
		// 	const decodedToken = jwtDecode(token);
		// 	const { userId } = decodedToken as { userId: string };

		// 	const fetchData = async () => {
		// 		const response = await fetch(`${BASE_URL}/reports/?userId=${userId}`);
		// 		const result: ReportData[] = await response.json();
		// 		setData(result);
		// 	};

		// 	fetchData();
		// }
	}, [dispatch]);

	// if (_.isEmpty(widgets)) {
	// 	return null;
	// }

	// const columns = ['ID', 'Date', 'Amount', 'Status'];
	// const rows = [
	// 	{ id: 1, date: '2023-10-01', amount: 100, status: 'completed' },
	// 	{ id: 2, date: '2023-10-02', amount: 200, status: 'pending' }
	// 	// Add more rows as needed
	// ];
	// const rows = data;

	return (
		<FusePageSimple
			header={<AnalyticsDashboardAppHeader />}
			content={
				<motion.div
					className="w-full p-24 md:p-32"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
						<motion.div
							variants={item}
							className="xl:col-span-2 flex flex-col flex-auto"
						>
							{data?.columns?.length > 0 ? (
								<RecentTransactionsWidget analyticsReport={data} />
							) : (
								<FuseLoading />
							)}
						</motion.div>
					</div>
					{/* <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
						<div>
							<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
								Recent transactions
							</Typography>
							<Typography
								className="font-medium"
								color="text.secondary"
							>
								1 pending, 4 completed
							</Typography>
						</div>

						<div className="table-responsive mt-24">
							<Table className="simple w-full min-w-full">
								<TableHead>
									<TableRow>
										{columns.map((column, index) => (
											<TableCell key={index}>
												<Typography
													color="text.secondary"
													className="font-semibold text-12 whitespace-nowrap"
												>
													{column}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody>
									{rows.map((row, index) => (
										<TableRow key={index}>
											{Object.entries(row).map(([key, value]) => (
												<TableCell key={key}>
													<Typography>{value}</Typography>
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</Paper> */}
				</motion.div>
			}
		/>
	);
}

export default AnalyticsDashboardApp;
