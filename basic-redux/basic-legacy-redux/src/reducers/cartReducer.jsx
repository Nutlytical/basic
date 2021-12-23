import { ADD_TO_CART, DELETE_TO_CART } from '../actions/cartAction';

// {
//     id: '',
//     title: '',
//     price: 1,
//     quantity:1
// }

const initialState = [];

export function cartReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			let updatedCart;
			const foundItem = state.find((item) => item.id === action.payload.id);

			if (!foundItem) {
				updatedCart = [...state, action.payload];
			} else {
				updatedCart = state.map((item) => ({
					...item,
					quantity:
						item.id === foundItem.id ? item.quantity + 1 : item.quantity,
				}));
			}

			return updatedCart;
		case DELETE_TO_CART:
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
}
