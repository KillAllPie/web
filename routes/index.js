'use strict';
var express = require('express');
var router = express.Router();
const { Item, getPaginated, User, getPaginatedSearch } = require('../tools/db');

/* GET home page. */
router.get('/', (req, res) => res.redirect('/p/1'));

router.get('/cart', async (req, res) => {
	let cart = [];

	if (Object.keys(req.session.cart).length == 0) {
		return res.render('cart', { title: 'cart', cart, user: req.session.user });
	}
	Item.find({ $or: Object.keys(req.session.cart).map(e => { return { itemId: parseInt(e) } }),}).then((result) => {
		let totalPrice = 0;
		result.forEach(e => {
			cart.push({
				title: e.title,
				price: e.price,
				img: e.img,
				id: e.itemId,
				amount: req.session.cart[e.id],
			});
			totalPrice += e.price;
		});
		res.render('cart', { title: 'cart', cart: cart, user: req.session.user, totalPrice });
	});
});

router.get('/orders', async (req, res) => {
	let ordersDB = await User.findOne({ userId: req.session.user.id }).populate('item').exec();
	
	let orders = [];
	if (ordersDB !== null) {
		ordersDB.orders.forEach(e => {
			orders.push({
				items: e.orderItems,
				status: e.status,
				totalPrice: e.orderItems.reduce((prev, curr) => { console.log(`${prev} + ${curr.item.price} = ${prev + curr.item.price}`); return prev + curr.item.price }, 0),
			});
			console.log({
				items: e.orderItems,
				status: e.status,
				totalPrice: e.orderItems.reduce((prev, curr) => { return prev + curr.item.price }, 0),
			})
		});
	}
	
	return res.render('orders', { title: 'orders', user: req.session.user, orders:orders });
});

router.post('/order', async (req, res) => {
	if (!req.session.cart)
		return res.status(418).json({});
	if (!req.session.user.loggedIn)
		return res.status(418).json({ message: 'notLoggedIn' });


	let cart = (await Item.find({ $or: Object.keys(req.session.cart).map(e => { return { itemId: parseInt(e) } })}).exec()).map(item => {return {item: item, count: req.session.cart[item.itemId]}});

	let user = await User.findOne({userId: req.session.user.id}).exec();
	
	await User.updateOne({ userId: req.session.user.id }, { orders: [...user.orders, {orderItems: cart, status:"ordered"}] }).exec();

	req.session.cart = {};

	return res.status(200).json({ message: 'success' });
});

router.get('/p/:page', async (req, res) => {

	let page = 1;

	try {
		page = parseInt(req.params.page);
	} catch (error) {
		page = 1;
	}

	if(req.query.query) {
	await getPaginatedSearch(page, 24, req.query.query).then((result) => {
		let arr = [];
		console.log(result);

		for (let item of result.page) {
			arr.push({
				title: item.title,
				id: item.itemId,
				price: item.price,
				img: item.img
			});
		}

		res.render('item', { title: 'Home', user: req.session.user, arr, page: page, pageCount: result.pageCount, search: req.query.query });
	});
	} else {
		await getPaginated(page, 24).then((result) => {
			let arr = [];

			for (let item of result.page) {
				arr.push({
					title: item.title,
					id: item.itemId,
					price: item.price,
					img: item.img
				});
			}

			res.render('item', { title: 'Home', user: req.session.user, arr, page: page, pageCount: result.pageCount });
	});
}
});

router.get('/p', (req, res) => res.redirect('/p/1'));

router.post('/cart', function (req, res) {
	if (!req.body.id || !req.body.amount)
		return res.status(418).json({});

	if (req.session.cart[req.body.id] > 0)
		return req.session.cart[req.body.id] += req.body.amount;
	else
		req.session.cart[req.body.id] = req.body.amount;
	res.status(200).json({});
});

router.delete('/cart', (req, res) => {
	if (!req.body.id)
		return res.status(418).json({});

	delete req.session.cart[req.body.id];
	return res.status(200).json({});
});

module.exports = router;
