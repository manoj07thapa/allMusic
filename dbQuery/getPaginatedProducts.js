import { getAsString } from '../utils/getAsString';
import Product from '../models/Product';

export async function getPaginatedProducts(query) {
	const search = getAsString(query.search);

	const make = getValueStr(query.make);
	const category = getValueStr(query.category);
	const model = getValueStr(query.model);
	const minPrice = getValueNumber(query.minPrice);
	const maxPrice = getValueNumber(query.maxPrice);
	const page = getValueNumber(query.page) || 1;
	const productsPerPage = getValueNumber(query.productsPerPage) || 4; //products perpage
	const skip = (page - 1) * productsPerPage;

	let params = {};
	if (search) {
		params = { $text: { $search: search } };
	} else if (!category && !minPrice && !maxPrice) {
		params = {};
	} else if (category && !make) {
		params = { category };
	} else if (category && make && !model) {
		params = { category, make };
	} else if (category && make && model) {
		params = { category, make, model };
	} else if (!category && maxPrice && !minPrice) {
		params = { price: { $lte: maxPrice } };
	} else if (!category && !maxPrice && minPrice) {
		params = { price: { $gte: minPrice } };
	} else if (!category && maxPrice && minPrice) {
		params = { price: { $gte: minPrice, $lte: maxPrice } };
	} else if (category && make && model && maxPrice && minPrice) {
		params = { category, make, model, price: { $gte: minPrice, $lte: maxPrice } };
	} else if (category && make && !model && maxPrice && minPrice) {
		params = { category, make, price: { $gte: minPrice, $lte: maxPrice } };
	} else if (category && !make && maxPrice && minPrice) {
		params = { category, price: { $gte: minPrice, $lte: maxPrice } };
	} else if (category && maxPrice && minPrice) {
		params = { category, price: { $gte: minPrice, $lte: maxPrice } };
	}
	const productsPromise = Product.find(params).limit(productsPerPage).skip(skip);
	// const products = await Product.find({ price: { $gte: minPrice } });
	const totalProductsPromise = Product.find(params).countDocuments();
	const [ products, totalProducts ] = await Promise.all([ productsPromise, totalProductsPromise ]);

	const totalPages = Math.ceil(totalProducts / productsPerPage);

	return { products, totalPages };
}

export function getValueNumber(value) {
	const str = getValueStr(value);
	const number = parseInt(str);
	return isNaN(number) ? null : number;
}

function getValueStr(value) {
	const str = getAsString(value);
	return !str || str.toLowerCase() === 'all' ? null : str;
}
