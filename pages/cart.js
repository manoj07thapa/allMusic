import { useState, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import {
	IconButton,
	Paper,
	Typography,
	Grid,
	makeStyles,
	Container,
	Button,
	Tooltip,
	Checkbox
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'next/image';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCart } from '../hooks/getCart';
import CartTotal from '../components/CartTotal';
import CartQty from '../components/CartQty';
import axios from 'axios';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: theme.palette.primary.contrastText,
		marginTop: '1rem',
		width: '60%'
	},
	title: {
		fontWeight: 'bold',
		marginTop: '2rem'
	},
	subtitleMargin: {
		marginTop: '2rem'
	},
	center: {
		marginTop: '10rem',
		marginLeft: '27rem'
	}
}));

export default function CartPage() {
	const { token } = parseCookies();
	const classes = useStyles();
	const [ loading, setLoading ] = useState(false);

	// const [ checkedItem, setCheckedItem ] = useState([]);
	// console.log('CHECKEDITEMS:', checkedItem);

	// const handleCheckBox = (item) => {
	// 	const currentIndex = checkedItem.indexOf(item);
	// 	const newChecked = [ ...checkedItem ];
	// 	if (currentIndex === -1) {
	// 		newChecked.push(item);
	// 	} else {
	// 		newChecked.splice(currentIndex, 1);
	// 	}
	// 	setCheckedItem(newChecked);
	// };

	const { cart, isLoading, isError, mutate } = getCart();

	if (isError)
		return (
			<Typography variant="h6" className={classes.center}>
				There are no products in your cart yet
			</Typography>
		);

	if (isLoading)
		return (
			<div className={classes.center}>
				<CircularProgress />
			</div>
		);

	var checkedCart = cart.cartProducts.filter(function(x) {
		return x.isChecked % 2 === 0;
	});

	const handleCheckBox = async (checkedItem) => {
		try {
			const res = await fetch(`/api/checkedItemCart`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ checkedItem })
			});
			setLoading(true);
			const data = await res.json();
			const checkedCart = data.checkedCart;
			mutate({ ...cart, checkedCart });
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteCart = async (pId) => {
		try {
			const res = await axios.delete('/api/cart', {
				headers: {
					Authorization: token
				},
				data: {
					productId: pId
				}
			});
			setLoading(true);
			const data = await res.data;
			mutate({ ...cart, data });
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	// if (loading) {
	// 	return <CircularProgress />;
	// }
	const CartItems = () => (
		<Fragment>
			{cart.cartProducts.map((item) => (
				<Paper className={classes.paper} key={item.product._id}>
					<div style={{ padding: '1rem' }}>
						<Grid container spacing={5}>
							<Grid item xs={1}>
								{/* <Checkbox
									checked={checkedItem.indexOf(item) === -1 ? false : true}
									inputProps={{ 'aria-label': 'primary checkbox' }}
									onChange={() => {
										handleCheckBox(item);
									}}
								/> */}
								<Checkbox
									checked={item.isChecked % 2 === 0 ? true : false}
									inputProps={{ 'aria-label': 'primary checkbox' }}
									onChange={() => {
										handleCheckBox(item);
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<Image src={item.product.files[0].url} alt="cart items" height={200} width={200} />
							</Grid>
							<Grid item xs={4}>
								<Typography variant="h6">Rs. {item.product.price}</Typography>
								<Typography variant="subtitle1">
									{`${item.product.make} (${item.product.model})`}
								</Typography>
							</Grid>

							<Grid item xs={3}>
								<CartQty qty={item.quantity} productId={item.product._id} mutate={mutate} cart={cart} />
							</Grid>
							<Grid item xs={2}>
								<Tooltip title="remove from cart">
									<IconButton
										aria-label="delete"
										variant="contained"
										className={classes.margin}
										onClick={() => {
											deleteCart(item.product._id);
										}}
									>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
					</div>
				</Paper>
			))}
		</Fragment>
	);

	return (
		<Fragment>
			<Head>
				<title>Cart</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<div style={{ marginLeft: '7rem' }}>
					<div style={{ backgroundColor: '#ffba08', magrin: '1rem', textAlign: 'center' }}>
						<Grid container spacing={1}>
							<Grid item xs={2}>
								<Typography variant="h5" className={classes.title}>
									My Cart
								</Typography>
							</Grid>

							<Grid item xs={10}>
								<Typography variant="subtitle1" className={classes.subtitleMargin}>
									You have {cart.cartProducts.length} products in your cart as of yet
								</Typography>
							</Grid>
						</Grid>
					</div>
					{/* {loading && <CircularProgress />} */}
					<CartItems />
					{cart.cartProducts.length === 0 && (
						<div className={classes.center}>
							<Typography variant="h6">Your cart is empty</Typography>
							<br />
							<Button onClick={() => router.push('/products')}>Continue Shopping</Button>
						</div>
					)}
					{cart.cartProducts.length !== 0 && <CartTotal checked={checkedCart} />}
				</div>
			</Container>
		</Fragment>
	);
}

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}
