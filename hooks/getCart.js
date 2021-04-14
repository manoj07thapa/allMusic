import useSwr from 'swr';
import { parseCookies } from 'nookies';
export const getCart = () => {
	const { token } = parseCookies();
	const { data, error, mutate } = useSwr(token ? `/api/cart` : null);
	return {
		cart: data,
		isLoading: !error && !data,
		isError: error,
		mutate
	};
};
