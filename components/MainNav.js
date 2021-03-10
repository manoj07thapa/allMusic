import { makeStyles, AppBar, Button, Toolbar, Typography, Container, Grid } from '@material-ui/core';
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
		backgroundColor: theme.palette.background.paper
	},
	anchorTag: {
		textDecoration: 'none'
	}
}));

const smartPhoneMakes = [ 'Apple', 'Samsung', 'Oneplus', 'Huawei' ];
const laptopMakes = [ 'Dell', 'Acer', 'Hp', 'Lenovo', 'Apple' ];
const tabletMakes = [ 'Apple', 'OnePlus', 'Lenevo', 'Samsung' ];
const desktopMakes = [ 'Apple', 'Dell', 'Lenevo', 'Acer' ];

export default function ManinNav() {
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
		<div>
			<AppBar position="static" color="secondary">
				<Container>
					<Toolbar variant="dense">
						<Grid container>
							<Grid item xs={2}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuSmartphone} animation="slide-up">
									<Button component="a">SmartPhone</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={2}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuLaptop} animation="slide-up">
									<Button>Laptop</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={2}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuTablet} animation="slide-up">
									<Button>Tablet</Button>
								</Dropdown>
							</Grid>
							<Grid item xs={2}>
								<Dropdown trigger={[ 'hover' ]} overlay={menuDesktop} animation="slide-up">
									<Button>Desktop</Button>
								</Dropdown>
							</Grid>
						</Grid>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
