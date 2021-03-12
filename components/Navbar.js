import { AppBar, Button, Toolbar, Typography, Container, Tooltip, IconButton, InputBase } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles, fade } from '@material-ui/core/styles';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useRouter } from 'next/router';
import cookie1 from 'js-cookie';
import Search from './Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { darkTheme, lightTheme } from './theme';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
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

export default function Nav({ setTheme, isDarkTheme }) {
	const classes = useStyles();

	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';

	const router = useRouter();

	const handleLogout = () => {
		cookie1.remove('token');
		cookie1.remove('user');
		router.push('/login');
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Container>
					<Toolbar variant="dense">
						<Image src="/shoppify.jpg" layout="fixed" width={30} height={30} alt="shopping" />
						<Typography variant="h6" className={classes.title}>
							SHOPIFY
						</Typography>
						<Search />
						<Link href="/cart">
							<Tooltip title="Shopping cart">
								<IconButton color="inherit" component="a" aria-label="Shopping cart">
									<ShoppingBasketIcon />
								</IconButton>
							</Tooltip>
						</Link>

						{user ? (
							<div>
								<Link href="/login">
									<a>
										<Tooltip title="logout">
											<IconButton color="inherit" onClick={handleLogout} aria-label="logout">
												<PersonIcon />
											</IconButton>
										</Tooltip>
									</a>
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
								<Link href="/dashboard">
									<a>
										<Tooltip title="Dashboard">
											<IconButton color="inherit" aria-label="Dashboard">
												<DashboardIcon />
											</IconButton>
										</Tooltip>
									</a>
								</Link>
							</div>
						) : null}

						<IconButton
							aria-label={isDarkTheme ? 'Change to Light Theme' : 'Change to Dark Theme'}
							onClick={() => {
								const newTheme = isDarkTheme ? lightTheme : darkTheme;
								setTheme(newTheme);
							}}
						>
							{isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
