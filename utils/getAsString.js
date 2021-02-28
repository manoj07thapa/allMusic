//this method return a string in case if we have an array of query string
export function getAsString(value) {
	if (Array.isArray(value)) {
		return value[0];
	}
	return value;
}
