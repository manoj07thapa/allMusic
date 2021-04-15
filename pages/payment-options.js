import KhaltiPayment from '../components/paymentOptions/KhaltiPayment';
import EsewaPayment from '../components/paymentOptions/EsewaPayment';
import { Grid, Container } from '@material-ui/core';
export default function PaymentOptions() {
	return (
		<Container>
			<Grid container style={{ marginTop: '5rem' }}>
				<Grid item xs={12} sm={6}>
					<KhaltiPayment />
				</Grid>
				<Grid item xs={12} sm={6}>
					<EsewaPayment />
				</Grid>
			</Grid>
		</Container>
	);
}
