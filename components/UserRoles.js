import { parseCookies } from 'nookies';
import fetch from 'isomorphic-unfetch';
import { getUsers } from '../hooks/getUsers';
import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	Container,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Tooltip,
	IconButton,
	withStyles,
	Select,
	FormControl,
	MenuItem
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from './Modal';

const useStyles = makeStyles({
	table: {
		marginTop: '3rem',
		marginLeft: '2rem',
		width: '100%'
	}
});

export default function UserRoles() {
	const classes = useStyles();

	const { token } = parseCookies();

	const { users, isLoading, isError, mutate } = getUsers();
	console.log('USERS', users);

	if (isError)
		return (
			<Typography variant="h6" className={classes.center}>
				There are no users
			</Typography>
		);

	if (isLoading)
		return (
			<div className={classes.center}>
				<CircularProgress />
			</div>
		);

	const handleRole = async (_id, currentRole) => {
		try {
			const res = await fetch('/api/user/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ _id, currentRole })
			});
			const data = await res.json();
			const updatedUsers = users.users.map((user) => {
				if (user.role !== data.user.role && user.email === data.user.email) {
					return data.user;
				} else {
					return user;
				}
			});
			mutate();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const res = await fetch('/api/user/users', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify({ id })
			});
			mutate();
		} catch (error) {
			console.log(error);
		}
	};

	const StyledTableCell = withStyles((theme) => ({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white
		},
		body: {
			fontSize: 14
		}
	}))(TableCell);

	const StyledTableRow = withStyles((theme) => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.action.hover
			}
		}
	}))(TableRow);

	return (
		<Container>
			<div className={classes.table}>
				<Typography variant="h6">Manage Users</Typography>
				<br />
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<StyledTableCell>First Name</StyledTableCell>
								<StyledTableCell align="right">Last Name</StyledTableCell>
								<StyledTableCell align="right">Email</StyledTableCell>
								<StyledTableCell align="right">Role</StyledTableCell>
								<StyledTableCell align="right">Remove</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.users.map((row) => (
								<StyledTableRow key={row._id}>
									<StyledTableCell component="th" scope="row">
										{row.firstname}
									</StyledTableCell>
									<StyledTableCell align="right">{row.lastname}</StyledTableCell>
									<StyledTableCell align="right">{row.email}</StyledTableCell>
									<StyledTableCell align="right">
										<FormControl fullWidth>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												onChange={() => handleRole(row._id, row.role)}
												defaultValue={row.role}
											>
												<MenuItem value={10}>admin</MenuItem>
												<MenuItem value={20}>user</MenuItem>
											</Select>
										</FormControl>
									</StyledTableCell>
									<StyledTableCell align="right">
										<Tooltip title="remove this user">
											<IconButton onClick={() => handleDelete(row._id)}>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Container>
	);
}
