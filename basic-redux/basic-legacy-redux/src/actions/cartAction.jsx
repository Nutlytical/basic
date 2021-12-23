export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_TO_CART = 'DELETE_TO_CART';

// const action = {
// 	type: '',
// 	payload: {
// 		id: '',
// 		title: '',
// 		price: 1,
// 		quantity: 1,
// 	},
// };

// Action creators
export function addToCart(addedProduct) {
	return {
		type: ADD_TO_CART,
		payload: addedProduct,
	};
}

export function deleteCart(id) {
	return {
		type: DELETE_TO_CART,
		payload: id,
	};
}
