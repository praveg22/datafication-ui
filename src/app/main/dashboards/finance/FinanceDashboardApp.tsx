import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { useAppDispatch, useAppSelector } from 'app/store';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import AccountBalanceWidget from 'src/app/main/dashboards/finance/widgets/AccountBalanceWidget';
import BudgetWidget from 'src/app/main/dashboards/finance/widgets/BudgetWidget';
import CurrentStatementWidget from 'src/app/main/dashboards/finance/widgets/CurrentStatementWidget';
import PreviousStatementWidget from 'src/app/main/dashboards/finance/widgets/PreviousStatementWidget';
import RecentTransactionsWidget from 'src/app/main/dashboards/finance/widgets/RecentTransactionsWidget';
import FinanceDashboardAppHeader from './FinanceDashboardAppHeader';
import { getWidgets, selectWidgets } from './store/widgetsSlice';

/**
 * The finance dashboard app.
 */
function FinanceDashboardApp() {
	const dispatch = useAppDispatch();
	const widgets = useAppSelector(selectWidgets);

	// console.log('widgets', widgets);
	// console.log('selectWidgets', selectWidgets);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	const content = (
		<div className="w-full px-24 md:px-32 pb-24">
			{useMemo(() => {
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

				return (
					!_.isEmpty(widgets) && (
						<motion.div
							className="w-full"
							variants={container}
							initial="hidden"
							animate="show"
						>
							<div className="grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32">
								<div className="grid gap-32 sm:grid-flow-col xl:grid-flow-row">
									<motion.div
										variants={item}
										className="flex flex-col flex-auto"
									>
										<PreviousStatementWidget />
									</motion.div>

									<motion.div
										variants={item}
										className="flex flex-col flex-auto"
									>
										<CurrentStatementWidget />
									</motion.div>
								</div>
								<motion.div
									variants={item}
									className="flex flex-col flex-auto"
								>
									<AccountBalanceWidget />
								</motion.div>
							</div>
							<div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
								<motion.div
									variants={item}
									className="xl:col-span-2 flex flex-col flex-auto"
								>
									<RecentTransactionsWidget />
								</motion.div>
								<motion.div
									variants={item}
									className="flex flex-col flex-auto"
								>
									<BudgetWidget />
								</motion.div>
							</div>
						</motion.div>
					)
				);
			}, [widgets])}
		</div>
	);

	return (
		<FusePageSimple
			header={<FinanceDashboardAppHeader />}
			content={content}
		/>
	);
}

export default FinanceDashboardApp;
