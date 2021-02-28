import { AppBar, Button, Toolbar, Typography, Container, Tooltip, IconButton, InputBase } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles, fade } from '@material-ui/core/styles';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibleIcon from '@material-ui/icons/Accessible';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import cookie1 from 'js-cookie';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: '1rem'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

export default function Nav() {
	const classes = useStyles();

	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	// console.log(user);
	// let normalUser = false;
	// let admin = false;
	// if (token && user.role === 'user') {
	// 	normalUser = true;
	// } else if (token && user.role === 'admin') {
	// 	admin = true;
	// } else {
	// 	normalUser = false;
	// 	admin = false;
	// }

	const router = useRouter();

	const handleLogout = () => {
		cookie1.remove('token');
		cookie1.remove('user');
		router.push('/login');
	};

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Image src="/shoppify.jpg" layout="fixed" width={30} height={30} alt="shopping" />
					<Typography variant="h6" className={classes.title}>
						Mugicology
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<Link href="/">
						<Button color="inherit" component="a">
							Home
						</Button>
					</Link>

					{user ? (
						<div>
							<Link href="/login">
								<Tooltip title="logout">
									<IconButton
										color="inherit"
										component="a"
										onClick={handleLogout}
										aria-label="logout"
									>
										<PersonIcon />
									</IconButton>
								</Tooltip>
							</Link>
						</div>
					) : (
						<div>
							<Link href="/signup">
								<Button color="inherit" component="a">
									Signup
								</Button>
							</Link>

							<Link href="/login">
								<Button color="inherit" component="a">
									Login
								</Button>
							</Link>
						</div>
					)}
					{user.role === 'admin' || user.role === 'root' ? (
						<div>
							<Link href="/createProduct">
								<Button color="inherit" component="a">
									Create
								</Button>
							</Link>

							<Link href="/dashboard">
								<Tooltip title="Dashboard">
									<IconButton color="inherit" component="a" aria-label="Dashboard">
										<DashboardIcon />
									</IconButton>
								</Tooltip>
							</Link>
						</div>
					) : null}

					<Link href="/cart">
						<Tooltip title="Shopping cart">
							<IconButton color="inherit" component="a" aria-label="Shopping cart">
								<ShoppingBasketIcon />
							</IconButton>
						</Tooltip>
					</Link>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
