import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAsString } from '../utils/getAsString';

export default function ProductPagination({ totalPages }) {
	const { query } = useRouter();
	console.log('pagination', query);
	const router = useRouter();
	console.log('PaginationRouter', router);

	return (
		<div>
			<Pagination
				page={parseInt(getAsString(query.page) || '1')}
				count={totalPages}
				renderItem={(item) => <PaginationItem component={MaterialUiLink} query={query} item={item} {...item} />}
			/>
		</div>
	);
}

const MaterialUiLink = React.forwardRef(({ item, query, ...props }, ref) => (
	<Link
		href={{
			pathname: `/${query.category}/${query.make}`,
			query: { page: item.page }
		}}
		shallow
	>
		<a {...props} ref={ref} />
	</Link>
));
