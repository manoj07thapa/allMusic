import { useState, useEffect, Fragment } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { Button, makeStyles, Paper, Grid, Container } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function account() {
	const classes = useStyles();

	const [ checked, setChecked ] = useState([ 1 ]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const { token } = parseCookies();
	const cookie = parseCookies();

	const [ orders, setOrders ] = useState([]);

	useEffect(() => {
		const getOrders = async () => {
			const res = await fetch('/api/orders', {
				method: 'GET',
				headers: {
					Authorization: token
				}
			});

			const data = await res.json();

			setOrders(data.orders);
		};
		getOrders();
	}, []);
	console.log(orders);
	const user = cookie.user ? JSON.parse(cookie.user) : null;
	if (!user) {
		return (
			<div>
				<h2>please lgin to view your account</h2>
				<Link href="/login">
					<Button color="inherit" component="a">
						Login
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div>
			<Container>
				<h1>{user.firstname}'s Account page</h1>
				<List dense className={classes.root}>
					{orders.map((order) => {
						return order.products.map((item) => (
							<ListItem key={item._id} button>
								<ListItemAvatar>
									<Avatar alt="product" src={item.product.image} />
								</ListItemAvatar>
								<ListItemText id={item} primary={item.product.make} />
								<ListItemText id={item} primary={item.product.price} />
								<ListItemText id={item} primary={item.quantity} />

								<ListItemSecondaryAction>
									<Checkbox
										edge="end"
										onChange={handleToggle(item)}
										checked={checked.indexOf(item) !== -1}
										inputProps={{ 'aria-labelledby': item }}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						));
					})}
				</List>
			</Container>
		</div>
	);
}
