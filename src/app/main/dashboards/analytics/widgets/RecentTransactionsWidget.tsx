import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { memo } from 'react';
import { AnalyticsReport } from 'src/app/main/dashboards/analytics/AnalyticsDashboardApp';
// import RecentTransactionsWidgetType from '../types/RecentTransactionsWidgetType';

/**
 * The RecentTransactionsWidget widget.
 */
type RecentTransactionsWidgetProps = {
	analyticsReport: AnalyticsReport;
};
function RecentTransactionsWidget({ analyticsReport }: RecentTransactionsWidgetProps) {
	// const widgets = useAppSelector(selectWidgets);
	// console.log('analytics', analyticsReport);
	// const { columns, rows } = widgets.analyticsReport as RecentTransactionsWidgetType;
	const { columns, rows } = analyticsReport;
	// const columns = ['ID', 'Date', 'Amount', 'Status'];
	// const rows = [
	// 	{ id: 1, date: '2023-10-01', amount: 100, status: 'completed' },
	// 	{ id: 2, date: '2023-10-02', amount: 200, status: 'pending' },
	// 	{ id: 2, date: '2023-10-02', amount: 200, status: 'pending' }
	// ];
	// console.log('columns', columns, rows);

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			{/* <div>
				<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
					Recent transactions
				</Typography>
				<Typography
					className="font-medium"
					color="text.secondary"
				>
					1 pending, 4 completed
				</Typography>
			</div> */}

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
								{Object.entries(row).map(([key, value]) => {
									switch (key) {
										case 'reportName': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography color="text.secondary">{value}</Typography>
												</TableCell>
											);
										}
										case 'reportDate': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{format(new Date(value), 'MMM dd, y')}</Typography>
												</TableCell>
											);
										}
										case 'downloadFile': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>
														<a href={value}>Download</a>
													</Typography>
												</TableCell>
											);
										}
										// case 'status': {
										// 	return (
										// 		<TableCell
										// 			key={key}
										// 			component="th"
										// 			scope="row"
										// 		>
										// 			<Typography
										// 				className={clsx(
										// 					'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
										// 					value === 'pending' &&
										// 						'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50',
										// 					value === 'completed' &&
										// 						'bg-green-50 text-green-800 dark:bg-green-600 dark:text-green-50'
										// 				)}
										// 			>
										// 				{value}
										// 			</Typography>
										// 		</TableCell>
										// 	);
										// }
										default: {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{value}</Typography>
												</TableCell>
											);
										}
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
				{/* <div className="pt-24">
					<Button variant="outlined">See all transactions</Button>
				</div> */}
			</div>
		</Paper>
	);
}

export default memo(RecentTransactionsWidget);
