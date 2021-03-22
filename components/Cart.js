import { Tooltip, IconButton, Badge } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import useSwr from 'swr';

export default function Cart() {
	// const [ quantity, setQuantity ] = useState(null);
	// console.log('qUANTITY', quantity);

	// useEffect(
	// 	() => {
	// 		getCartByUser();
	// 	},
	// 	[ quantity ]
	// );

	const cookie = parseCookies();

	// const { data } = useSwr([ `/api/cart`, cookie ]);

	// const getCartByUser = async () => {
	// 	try {
	// 		const res = await fetch(`/api/cart`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: cookie.token
	// 			}
	// 		});
	// 		const data = await res.json();

	// 		let total = 0;
	// 		data.cart.products.map((p) => {
	// 			total += p.quantity;
	// 		});
	// 		setQuantity(total);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	return (
		<Tooltip title="Shopping cart">
			<IconButton color="inherit" aria-label="Shopping cart">
				<Badge badgeContent="11" color="secondary">
					<ShoppingBasketIcon />
				</Badge>
			</IconButton>
		</Tooltip>
	);
}
