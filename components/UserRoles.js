import { useEffect, useState, Fragment } from 'react';
import { parseCookies } from 'nookies';
import fetch from 'isomorphic-unfetch';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

export default function UserRoles() {
	const classes = useStyles();

	const { token } = parseCookies();
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const res = await fetch('/api/user/users', {
				headers: {
					Authorization: token
				}
			});
			const data = await res.json();
			setUsers(data.users);
		} catch (error) {
			console.log(error);
		}
	};

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
			console.log(data.user);
			const updatedUsers = users.map((user) => {
				if (user.role !== data.user.role && user.email === data.user.email) {
					return data.user;
				} else {
					return user;
				}
			});
			setUsers(updatedUsers);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell align="right">Last Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((row) => (
						<TableRow key={row._id}>
							<TableCell component="th" scope="row">
								{row.firstname}
							</TableCell>
							<TableCell align="right">{row.lastname}</TableCell>
							<TableCell align="right">{row.email}</TableCell>
							<TableCell align="right" onClick={() => handleRole(row._id, row.role)}>
								{row.role}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
