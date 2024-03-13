import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CurriculumReducer from '@/redux/create/curriculum';
import AuthReducer from './auth/auth';

export const store = configureStore({
	reducer: {
		Auth: AuthReducer,
		Curriculum: CurriculumReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
