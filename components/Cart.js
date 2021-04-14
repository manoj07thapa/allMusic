import { Tooltip, IconButton, Badge } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { getCart } from '../hooks/getCart';

export default function Cart() {
	const { token } = parseCookies();

	const [ quantity, setQuantity ] = useState([]);

	// const { cart, isLoading, isError } = getCart();
	// console.log('CARTCART', cart);

	let total = 0;
	if (quantity) {
		quantity.map((p) => (total = +p.quantity));
	}

	useEffect(
		() => {
			fetchQuantity();
		},
		[ total ]
	);

	const fetchQuantity = async () => {
		try {
			if (token) {
				const res = await fetch('/api/cart', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token
					}
				});
				const data = await res.json();
				setQuantity(data.cartProducts);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Tooltip title="Shopping cart">
			<IconButton color="inherit" aria-label="Shopping cart">
				<Badge badgeContent={total} color="secondary">
					<ShoppingBasketIcon />
				</Badge>
			</IconButton>
		</Tooltip>
	);
}
