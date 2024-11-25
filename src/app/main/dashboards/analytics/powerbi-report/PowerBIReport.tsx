import { useLocation } from 'react-router-dom';
import css from './PowerBIReport.module.scss';

function PowerBIReport() {
	const location = useLocation();
	const { reportLink } = location.state || {};

	if (!reportLink) {
		return <div>Error: No report link provided.</div>;
	}

	return (
		<div className={css.powerbiContainer}>
			<iframe
				className={css.powerbiFrame}
				title="PowerBI Report"
				src={reportLink}
			/>

			{/* <iframe
				title={reportLink}
				src={reportLink}
				width="800"
				height="600"
			/> */}
			{/* <PowerBIEmbed
				embedConfig={{
					type: 'report',
					embedUrl: reportLink as string
					// accessToken: 'YOUR_ACCESS_TOKEN',
					// tokenType: models.TokenType.Embed
				}}
				cssClassName="powerbi-frame"
				// styles={{ border: 'none' }}
			/> */}
		</div>
	);
}

export default PowerBIReport;

// import { models } from 'powerbi-client';
// import { PowerBIEmbed } from 'powerbi-client-react';
// import { useParams } from 'react-router-dom';

// function PowerBIReport() {
// 	const { reportId } = useParams();

// 	return (
// 		<div style={{ height: '100vh', width: '100%' }}>
// 			<PowerBIEmbed
// 				embedConfig={{
// 					type: 'report',
// 					id: reportId,
// 					embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=your-group-id`,
// 					accessToken: 'YOUR_ACCESS_TOKEN', // Replace with dynamic token generation
// 					tokenType: models.TokenType.Embed
// 				}}
// 				cssClassName="powerbi-frame"
// 				styles={{ border: 'none' }}
// 			/>
// 		</div>
// 	);
// }

// export default PowerBIReport;
