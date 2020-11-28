import { useEffect, useState, Fragment } from 'react';
import { parseCookies } from 'nookies';
import fetch from 'isomorphic-unfetch';
import UserTable from './UserTable';

export default function UserRoles() {
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
			console.log(data.users);
			setUsers(data.users);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<UserTable users={users} />
		</Fragment>
	);
}
