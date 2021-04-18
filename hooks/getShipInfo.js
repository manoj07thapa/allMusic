import useSwr from 'swr';
import { parseCookies } from 'nookies';
export const getShipInfo = () => {
	const { token } = parseCookies();
	const { data, error, mutate } = useSwr(token ? `/api/user/shipInfo` : null);
	return {
		shipInfo: data,
		loading: !error && !data,
		error: error,
		mutate
	};
};
