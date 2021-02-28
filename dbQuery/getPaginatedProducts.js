import { getAsString } from '../utils/getAsString';
import Product from '../models/Product';

export async function getPaginatedProducts(query) {
	// const { category, make, model } = query;

	// const filters = {
	// 	category: getValueStr(query.category),
	// 	make: getValueStr(query.make),
	// 	model: getValueStr(query.model)
	// };

	const make = getValueStr(query.make);
	const category = getValueStr(query.category);
	const model = getValueStr(query.model);
	const minPrice = getValueNumber(query.minPrice);
	const maxPrice = getValueNumber(query.maxPrice);
	const page = getValueNumber(query.page) || 1;
	const productsPerPage = getValueNumber(query.productsPerPage) || 4; //products perpage
	const skip = (page - 1) * productsPerPage;
	console.log('category:', category);
	console.log('minprice:', minPrice);
	console.log(' type of minprice:', typeof minPrice);

	let params = {};

	if (!category && !minPrice && !maxPrice) {
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
	const totalProductsPromise = Product.find(params).count();
	const [ products, totalProducts ] = await Promise.all([ productsPromise, totalProductsPromise ]);

	console.log('Total Products', totalProducts);
	const totalPages = Math.ceil(totalProducts / productsPerPage);
	console.log('TotalPages:', totalPages);

	return { products, totalPages };
}

function getValueNumber(value) {
	const str = getValueStr(value);
	const number = parseInt(str);
	return isNaN(number) ? null : number;
}

function getValueStr(value) {
	const str = getAsString(value);
	return !str || str.toLowerCase() === 'all' ? null : str;
}
