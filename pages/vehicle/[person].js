import { useRouter } from 'next/router';
import Link from 'next/link';
import Test from '../../components/Test';
import Test1 from '../../components/Test1';
import Test2 from '../../components/Test2';

const people = [
	{ name: 'manoj', component: <Test /> },
	{ name: 'nabin', component: <Test1 /> },
	{ name: 'ramesh', component: <Test2 /> }
];

export default function Person() {
	const router = useRouter();
	console.log(router);
	return (
		<div style={{ display: 'flex' }}>
			<div>
				{people.map((p) => (
					<div key={p.name}>
						<Link href={`/vehicle/${p.name}`}>
							<a>{`${p.name}'s  vehicle`}</a>
						</Link>
						{p.name}'s vehicle
					</div>
				))}
			</div>
		</div>
	);
}
