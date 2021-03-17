import {
	AppBar,
	Button,
	Toolbar,
	Typography,
	Container,
	Tooltip,
	IconButton,
	Slide,
	useScrollTrigger,
	Menu,
	MenuItem,
	Badge
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import MenuDrawer from './MenuDrawer';
import { parseCookies } from 'nookies';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router';
import cookie1 from 'js-cookie';
import Search from './Search';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { darkTheme, lightTheme } from './theme';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1
	},
	anchorTag: {
		textDecoration: 'none',
		color: 'white'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		display: 'none',
		textDecoration: 'none',
		marginLeft: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Nav({ setTheme, isDarkTheme, props }) {
	const classes = useStyles();

	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';

	const router = useRouter();

	const handleLogout = () => {
		cookie1.remove('token');
		cookie1.remove('user');
		router.push('/login');
	};

	//showmore icon section for mobile view
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link
					href={{
						path: '/dashboard',
						query: { query: 'index' }
					}}
				>
					<a className={classes.anchorTag}>
						<IconButton color="inherit" aria-label="Dashboard">
							<DashboardIcon style={{ backgroundColor: 'black' }} />
						</IconButton>
					</a>
				</Link>
				<p>Dashboard</p>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link href="/login">
					<a className={classes.anchorTag} onClick={handleLogout}>
						<IconButton color="inherit" aria-label="Dashboard">
							<ExitToAppIcon style={{ backgroundColor: 'black' }} />
						</IconButton>
					</a>
				</Link>
				<p>Logout</p>
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link href="/cart">
					<IconButton
						aria-label="show new notifications"
						color="inherit"
						component="a"
						aria-label="Shopping cart"
					>
						<Badge badgeContent={11} color="secondary">
							<ShoppingBasketIcon />
						</Badge>
					</IconButton>
				</Link>
				<p>Cart</p>
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>
				<Link href="/">
					<a className={classes.anchorTag}>
						<IconButton color="inherit" aria-label="Dashboard">
							<HomeIcon style={{ backgroundColor: 'black' }} />
						</IconButton>
					</a>
				</Link>
				<p>Home</p>
			</MenuItem>
			{!user && (
				<MenuItem onClick={handleMenuClose}>
					<Link href="/signup">
						<IconButton aria-label="signup" color="inherit" component="a" aria-label="Sign up">
							<LockOpenIcon />
						</IconButton>
					</Link>
					<p>Signup</p>
				</MenuItem>
			)}

			{!user && (
				<MenuItem onClick={handleMenuClose}>
					<Link href="/login">
						<IconButton aria-label="login" color="inherit" component="a" aria-label="Login">
							<VpnKeyIcon />
						</IconButton>
					</Link>
					<p>Login</p>
				</MenuItem>
			)}

			{user && (
				<MenuItem onClick={handleProfileMenuOpen}>
					<IconButton
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<p>Profile</p>
				</MenuItem>
			)}
			<MenuItem onClick={handleMenuClose}>
				<IconButton
					aria-label={isDarkTheme ? 'Change to Light Theme' : 'Change to Dark Theme'}
					onClick={() => {
						const newTheme = isDarkTheme ? lightTheme : darkTheme;
						setTheme(newTheme);
					}}
				>
					{isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
				<p>{isDarkTheme ? 'Light Mode' : ' Dark Mode'}</p>
			</MenuItem>
		</Menu>
	);

	//MenuIcon and drawer section
	const [ open, setOpen ] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.grow}>
			<HideOnScroll {...props}>
				<AppBar className={classes.appBar} color="primary">
					<Container>
						<Toolbar>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="open drawer"
								color="inherit"
								onClick={!open ? handleDrawerOpen : handleDrawerClose}
							>
								<MenuIcon />
							</IconButton>
							<Button>
								<Link href="/">
									<a className={classes.title}>
										<Typography variant="h6">SHOPIFY</Typography>
									</a>
								</Link>
							</Button>
							<div className={classes.grow} />

							<Search />

							<div className={classes.sectionDesktop}>
								<Link href="/cart">
									<Tooltip title="Shopping cart">
										<IconButton color="inherit" component="a" aria-label="Shopping cart">
											<ShoppingBasketIcon />
										</IconButton>
									</Tooltip>
								</Link>
								{user ? (
									<div>
										<Link
											href={{
												pathname: '/dashboard',
												query: { query: 'index' }
											}}
										>
											<a className={classes.anchorTag}>
												<Tooltip title="Dashboard">
													<IconButton color="inherit" aria-label="Dashboard">
														<DashboardIcon />
													</IconButton>
												</Tooltip>
											</a>
										</Link>
									</div>
								) : null}
								{user ? (
									<div>
										<Link href="/login">
											<a className={classes.anchorTag}>
												<Tooltip title="logout">
													<IconButton
														color="inherit"
														onClick={handleLogout}
														aria-label="logout"
													>
														<ExitToAppIcon />
													</IconButton>
												</Tooltip>
											</a>
										</Link>
									</div>
								) : (
									<div>
										<Link href="/signup">
											<Button color="inherit" component="a" style={{ marginTop: '0.5rem' }}>
												Signup
											</Button>
										</Link>

										<Link href="/login">
											<Button color="inherit" component="a" style={{ marginTop: '0.5rem' }}>
												Login
											</Button>
										</Link>
									</div>
								)}

								<IconButton
									className={classes.anchorTag}
									aria-label={isDarkTheme ? 'Change to Light Theme' : 'Change to Dark Theme'}
									onClick={() => {
										const newTheme = isDarkTheme ? lightTheme : darkTheme;
										setTheme(newTheme);
									}}
								>
									{isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
								</IconButton>
							</div>
							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon />
								</IconButton>
							</div>
						</Toolbar>
					</Container>
				</AppBar>
			</HideOnScroll>
			<MenuDrawer open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
