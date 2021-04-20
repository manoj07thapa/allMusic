import useSwr from 'swr';
import { parseCookies } from 'nookies';
export const getUsers = () => {
	const { token } = parseCookies();
	const { data, error, mutate } = useSwr(token ? `/api/user/users` : null);
	return {
		users: data,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
};
