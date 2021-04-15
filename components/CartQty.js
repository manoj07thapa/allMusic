import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { parseCookies } from 'nookies';

export default function CartQty({ qty, productId, mutate, cart }) {
	const { token } = parseCookies();

	const handleChange = async (e) => {
		try {
			const res = await fetch(`/api/cart`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ quantity: parseInt(e.target.value), productId })
			});
			const data = await res.json();
			const newCart = data.newCart;
			mutate({ ...cart, newCart });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormControl fullWidth>
			<InputLabel id="demo-simple-select-label">Quantity</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				onChange={handleChange}
				defaultValue={qty}
			>
				<MenuItem value={1}>1</MenuItem>
				<MenuItem value={2}>2</MenuItem>
				<MenuItem value={3}>3</MenuItem>
				<MenuItem value={4}>4</MenuItem>
				<MenuItem value={5}>5</MenuItem>
			</Select>
		</FormControl>
	);
}
