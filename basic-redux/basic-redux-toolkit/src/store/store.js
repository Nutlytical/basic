import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export default configureStore({
	reducer: {
		cart: cartReducer,
		auth: authReducer,
	},
});

// const example = { cart: [], auth: { user: null, loading: false, error: '' } };
