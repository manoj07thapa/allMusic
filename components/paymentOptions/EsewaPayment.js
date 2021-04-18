import { Grid, Container, Button } from '@material-ui/core';

export default function EsewaPayment({ totalAmt, products }) {
	return (
		<form action="https://uat.esewa.com.np/epay/main" method="POST">
			<input value="100" name="tAmt" type="hidden" />
			<input value="90" name="amt" type="hidden" />
			<input value="5" name="txAmt" type="hidden" />
			<input value="2" name="psc" type="hidden" />
			<input value="3" name="pdc" type="hidden" />
			<input value="EPAYTEST" name="scd" type="hidden" />
			<input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden" />
			<input value="http://localhost:3000/paymentSuccess" type="hidden" name="su" />
			<input value="http://localhost:3000/paymentFailed" type="hidden" name="fu" />
			<Button
				variant="contained"
				style={{ backgroundColor: '#008000', color: 'white' }}
				value="Submit"
				type="submit"
			>
				Esewa
			</Button>
		</form>
	);
}
