import { createSlice } from '@reduxjs/toolkit';
import createAppAsyncThunk from 'app/store/createAppAsyncThunk';
import { RootStateType } from 'app/store/types';
import axios from 'axios';
import { useEffect } from 'react';

type AppRootStateType = RootStateType<widgetsSliceType>;

export type WidgetsType = {
	[key: string]: unknown;
};

/**
 * Get the widgets data.
 */
export const getWidgets = createAppAsyncThunk('analyticsDashboardApp/widgets/getWidgets', async () => {
	useEffect(() => {
		fetchReports();
	}, []);

	// await fetchReports();
	// const response = await axios.get('/api/dashboards/analytics/widgets');

	// const data = (await response.data) as WidgetsType;

	// return data;

	async function fetchReports() {
		try {
			const token = localStorage.getItem('jwt_access_token');
			// console.log('token:', token);
			const response = await axios.get('/v1/reports', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = (await response.data) as WidgetsType;
			// console.log(')))))--------', data);
			return data;
		} catch (error) {
			// console.error('Error fetching reports:', error);
			return {};
		}
	}

	// await fetchReports();
});

const initialState: WidgetsType = {};

/**
 * The analytics dashboard widgets slice.
 */
export const widgetsSlice = createSlice({
	name: 'analyticsDashboardApp/widgets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getWidgets.fulfilled, (state, action) => action.payload);
	}
});

export const selectWidgets = (state: AppRootStateType) => state.analyticsDashboardApp.widgets;

export type widgetsSliceType = typeof widgetsSlice;

export default widgetsSlice.reducer;
