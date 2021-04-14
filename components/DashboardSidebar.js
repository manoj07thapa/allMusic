import Link from 'next/link';
import { parseCookies } from 'nookies';
import {
	makeStyles,
	Drawer,
	Toolbar,
	List,
	Typography,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useRouter } from 'next/router';
import CreateProduct from './CreateProduct';
import UserRoles from './UserRoles';
import UserAccount from './UserAccount';
import AddResource from './AddResource';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.primary.contrastText
	},
	drawerContainer: {
		overflow: 'auto',
		marginTop: '3rem'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: '3rem',
		backgroundColor: theme.palette.primary.contrastText
	},
	create: {
		backgroundColor: theme.palette.primary.contrastText
	}
}));

export default function DashboardSidebar() {
	const classes = useStyles();

	const { query } = useRouter();
	console.log(query);

	const cookie = parseCookies();
	const user = cookie.user ? JSON.parse(cookie.user) : '';
	console.log(user);

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<Link
							href={{
								pathname: '/dashboard',
								query: { query: 'index' }
							}}
						>
							<ListItem button>
								<ListItemIcon>
									<AppsIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>
						</Link>
					</List>
					{user.role === ('root' || 'admin') && (
						<div className={classes.create}>
							<List>
								<ListItem button>
									<Accordion>
										<AccordionSummary expandIcon={<ExpandMoreIcon />}>
											<ListItemIcon>
												<CreateNewFolderIcon />
											</ListItemIcon>
											<ListItemText primary="Create " />
										</AccordionSummary>
										<AccordionDetails>
											<List>
												<Link
													href={{
														pathname: '/dashboard',
														query: { query: 'add_product' }
													}}
												>
													<ListItem button>
														<ListItemIcon>
															<AddCircleIcon />
														</ListItemIcon>
														<ListItemText primary="Create Product" />
													</ListItem>
												</Link>
												<Divider />
												<Link
													href={{
														pathname: '/dashboard',
														query: { query: 'add_utility' }
													}}
												>
													<ListItem button>
														<ListItemIcon>
															<AddCircleIcon />
														</ListItemIcon>
														<ListItemText primary="Create Resource" />
													</ListItem>
												</Link>
											</List>
										</AccordionDetails>
									</Accordion>
								</ListItem>
							</List>

							<Divider />
							<List>
								<Link
									href={{
										pathname: '/dashboard',
										query: { query: 'user_management' }
									}}
								>
									<ListItem button>
										<ListItemIcon>
											<GroupIcon />
										</ListItemIcon>
										<ListItemText primary="User Management" />
									</ListItem>
								</Link>
							</List>
						</div>
					)}
					<List>
						<Link
							href={{
								pathname: '/dashboard',
								query: { query: 'user_account' }
							}}
						>
							<ListItem button>
								<ListItemIcon>
									<AccountTreeIcon />
								</ListItemIcon>
								<ListItemText primary="User Account" />
							</ListItem>
						</Link>
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<Toolbar />
				{query.query === 'index' && <div>Dashboard Home</div>}
				{query.query === 'add_product' && <CreateProduct />}
				{query.query === 'user_management' && <UserRoles />}
				{query.query === 'user_account' && <UserAccount />}
				{query.query === 'add_utility' && <AddResource />}
			</main>
		</div>
	);
}
