import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

export default function UserTable({ users }) {
	const classes = useStyles();
	const { token } = parseCookies();

	const [ updatedusers, setUpdatedUsers ] = useState(users);

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
			setUpdatedUsers(updatedUsers);
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
