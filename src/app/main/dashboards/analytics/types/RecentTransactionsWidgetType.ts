type TransactionType = {
	reportName: string;
	reportDate: string;
	downloadFile: string;
	// amount: number;
	// status: TransactionStatusType;
};

type RecentTransactionsWidgetType = {
	columns: string[];
	rows: TransactionType[];
};

export default RecentTransactionsWidgetType;

// enum TransactionStatusType {
// 	COMPLETED = 'completed',
// 	PENDING = 'pending'
// }
