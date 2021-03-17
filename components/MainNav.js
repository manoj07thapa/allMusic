import {
	makeStyles,
	AppBar,
	Button,
	Toolbar,
	Typography,
	Container,
	Grid,
	Slide,
	useScrollTrigger
} from '@material-ui/core';
import Link from 'next/link';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Smartphone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	anchorTag: {
		textDecoration: 'none'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		marginTop: '3rem',
		backgroundColor: '#495057'
	}
}));

const smartPhoneMakes = [ 'Apple', 'Samsung', 'Oneplus', 'Huawei' ];
const laptopMakes = [ 'Dell', 'Acer', 'Hp', 'Lenovo', 'Apple' ];
const tabletMakes = [ 'Apple', 'OnePlus', 'Lenevo', 'Samsung' ];
const desktopMakes = [ 'Apple', 'Dell', 'Lenevo', 'Acer' ];

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

export default function ManinNav(props) {
	const classes = useStyles();
	const menuSmartphone = (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{smartPhoneMakes.map((make, i) => (
					<Link
						href={{
							pathname: `/products`,
							query: { category: 'smartphone', make, page: 1 }
						}}
						key={i}
					>
						<a className={classes.anchorTag}>
							<ListItem button>
								<ListItemText primary={make} />
							</ListItem>
						</a>
					</Link>
				))}
			</List>
		</div>
	);

	const menuLaptop = (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{laptopMakes.map((make, i) => (
					<Link
						href={{
							pathname: `/products`,
							query: { category: 'laptop', make, page: 1 }
						}}
						key={i}
					>
						<a className={classes.anchorTag}>
							<ListItem button>
								<ListItemText primary={make} />
							</ListItem>
						</a>
					</Link>
				))}
			</List>
		</div>
	);

	const menuTablet = (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{tabletMakes.map((make, i) => (
					<Link
						href={{
							pathname: `/products`,
							query: { category: 'tab', make, page: 1 }
						}}
						key={i}
					>
						<a className={classes.anchorTag}>
							<ListItem button>
								<ListItemText primary={make} />
							</ListItem>
						</a>
					</Link>
				))}
			</List>
		</div>
	);

	const menuDesktop = (
		<div className={classes.root}>
			<List component="nav" aria-label="secondary mailbox folders">
				{desktopMakes.map((make, i) => (
					<Link
						href={{
							pathname: `/products`,
							query: { category: 'desktop', make, page: 1 }
						}}
						key={i}
					>
						<a className={classes.anchorTag}>
							<ListItem button>
								<ListItemText primary={make} />
							</ListItem>
						</a>
					</Link>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<HideOnScroll {...props}>
				<AppBar className={classes.appBar}>
					<Toolbar variant="dense">
						<Grid container>
							<Grid item xs={3}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuSmartphone} animation="slide-up">
									<Button component="a" color="button">
										SmartPhone
									</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={3}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuLaptop} animation="slide-up">
									<Button>Laptop</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={3}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuTablet} animation="slide-up">
									<Button>Tablet</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={3}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuDesktop} animation="slide-up">
									<Button>Desktop</Button>
								</Dropdown>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
		</div>
	);
}
