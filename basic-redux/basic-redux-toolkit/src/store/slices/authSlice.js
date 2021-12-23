import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from '../../data/users';

const initialState = {
	user: null,
	loading: false,
	error: '',
};

export const signInAsync = createAsyncThunk(
	'singIn',
	async ({ email, password }, store) => {
		try {
			// Api จริงๆ ใช้ fetch แทน await
			const user = await signIn(email, password);

			return user;
		} catch (error) {
			throw error;
		}
	}
);

// signInAsync.pending, signInAsync.fulfilled, signInAsync.rejected = กำลังโหลดโหลดสำเร็จ โหลดไม่สำเร็จ

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signOut: (state, action) => {
			state.user = null;
			state.loading = false;
			state.error = '';
		},
	},
	extraReducers: {
		// มี async ใช้ extraReducers
		[signInAsync.pending]: (state, action) => {
			state.loading = true;
			state.error = '';
		},
		[signInAsync.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.error = '';
		},
		[signInAsync.rejected]: (state, action) => {
			state.user = null;
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
