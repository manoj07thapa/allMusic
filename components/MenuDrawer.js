import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4),
		textDecoration: 'none',
		color: 'grey'
	},
	anchorTag: {
		textDecoration: 'none'
	}
}));

const smartPhoneMakes = [ 'Apple', 'Samsung', 'Oneplus', 'Huawei' ];
const laptopMakes = [ 'Dell', 'Acer', 'Hp', 'Lenovo', 'Apple' ];
const tabletMakes = [ 'Apple', 'OnePlus', 'Lenevo', 'Samsung' ];
const desktopMakes = [ 'Apple', 'Dell', 'Lenevo', 'Acer' ];

export default function MenuDrawer({ open, handleDrawerClose, handleDrawerOpen }) {
	const classes = useStyles();
	const theme = useTheme();

	const [ toogleSmartphone, setToogleSmartphone ] = React.useState(true);
	const [ toogleLaptop, setToogleLaptop ] = React.useState(false);
	const [ toogleTablet, setToogleTablet ] = React.useState(false);
	const [ toogleDesktop, setToogleDesktop ] = React.useState(false);

	const handleSmartphoneClick = () => {
		setToogleSmartphone(!toogleSmartphone);
	};
	const handleTabletClick = () => {
		setToogleTablet(!toogleTablet);
	};
	const handleLaptopClick = () => {
		setToogleLaptop(!toogleLaptop);
	};
	const handleDesktopClick = () => {
		setToogleDesktop(!toogleDesktop);
	};

	const renderSmartphones = (
		<List className={classes.root}>
			<ListItem button onClick={handleSmartphoneClick}>
				<ListItemText primary="Smartphone" />
				{toogleSmartphone ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={toogleSmartphone} timeout="auto" unmountOnExit>
				<List component="nav" disablePadding>
					{smartPhoneMakes.map((make, i) => (
						<Link
							href={{
								pathname: `/products`,
								query: { category: 'smartphone', make, page: 1 }
							}}
							key={i}
						>
							<a className={classes.anchorTag}>
								<ListItem button className={classes.nested} onClick={handleDrawerClose}>
									<ListItemText primary={make} />
								</ListItem>
							</a>
						</Link>
					))}
				</List>
			</Collapse>
		</List>
	);

	const renderLaptops = (
		<List className={classes.root}>
			<ListItem button onClick={handleLaptopClick}>
				<ListItemText primary="Laptop" />
				{toogleLaptop ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={toogleLaptop} timeout="auto" unmountOnExit>
				<List component="nav" disablePadding>
					{laptopMakes.map((make, i) => (
						<Link
							href={{
								pathname: `/products`,
								query: { category: 'laptop', make, page: 1 }
							}}
							key={i}
						>
							<a className={classes.anchorTag}>
								<ListItem button className={classes.nested} onClick={handleDrawerClose}>
									<ListItemText primary={make} />
								</ListItem>
							</a>
						</Link>
					))}
				</List>
			</Collapse>
		</List>
	);

	const renderTablets = (
		<List className={classes.root}>
			<ListItem button onClick={handleTabletClick}>
				<ListItemText primary="Tablet" />
				{toogleTablet ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={toogleTablet} timeout="auto" unmountOnExit>
				<List component="nav" disablePadding>
					{tabletMakes.map((make, i) => (
						<Link
							href={{
								pathname: `/products`,
								query: { category: 'tab', make, page: 1 }
							}}
							key={i}
						>
							<a className={classes.anchorTag}>
								<ListItem button className={classes.nested} onClick={handleDrawerClose}>
									<ListItemText primary={make} />
								</ListItem>
							</a>
						</Link>
					))}
				</List>
			</Collapse>
		</List>
	);

	const renderDesktops = (
		<List className={classes.root}>
			<ListItem button onClick={handleDesktopClick}>
				<ListItemText primary="Desktop" />
				{toogleDesktop ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={toogleDesktop} timeout="auto" unmountOnExit>
				<List component="nav" disablePadding>
					{desktopMakes.map((make, i) => (
						<Link
							href={{
								pathname: `/products`,
								query: { category: 'desktop', make, page: 1 }
							}}
							key={i}
						>
							<a className={classes.anchorTag}>
								<ListItem button className={classes.nested} onClick={handleDrawerClose}>
									<ListItemText primary={make} />
								</ListItem>
							</a>
						</Link>
					))}
				</List>
			</Collapse>
		</List>
	);

	return (
		<SwipeableDrawer
			anchor="left"
			open={open}
			className={classes.drawer}
			classes={{
				paper: classes.drawerPaper
			}}
			onClose={handleDrawerClose}
			onOpen={handleDrawerOpen}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />
			{renderSmartphones}
			{renderLaptops}
			{renderTablets}
			{renderDesktops}
		</SwipeableDrawer>
	);
}
