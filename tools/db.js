const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true, pass: ', user: ', dbName: '' });

const itemSchema = new mongoose.Schema({
	title: String,
	img: String,
	price: Number,
});


const OrderItem = new mongoose.Schema({
	item: itemSchema,
	count: Number,
});

const Order = new mongoose.Schema({
	status: String,
	orderItems: [OrderItem],
});

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	first_name: String,
	last_name: String,
	orders: {type: [Order], default: [] },
});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});
itemSchema.plugin(AutoIncrement, {inc_field: 'itemId'});
itemSchema.index({ title: 'text'});

const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);


async function getPaginated(page, limit){
    let result = []
	try {
		result = await (Item.find().skip(page * limit).limit(limit).exec());
    } catch (e) {
        console.log(e);
    }

    return {
        page: result,
        pageCount: await getPageCount(limit), 
    };
}

async function getPageCount(limit) {
    let result = 0;
	try {
		let count = (await Item.find().exec()).length;
		result = Math.ceil(count / limit)
    } catch (e) {
        console.log(e);
    }

    return result;
}

async function getPaginatedSearch(page, limit, query) {
    page = page == 1 ? 0 : page;

    let result = []
	try {
		result = await (Item.find({$text: {$search: query}}).skip(page * limit).limit(limit).exec());
    } catch (e) {
        console.log(e);
    }

    return {
        page: result,
        pageCount: await getPageCountSearch(limit, query), 
    };
}

async function getPageCountSearch(limit, query) {
    let result = 0;
	try {
		let count = (await Item.find({$text: {$search: query}}).exec()).length;
		result = Math.ceil(count / limit)
    } catch (e) {
        console.log(e);
    }

    return result - 1;
}

async function getUserOrders(userId) {
	let user = await User.find({id: userId}).populate('item');

	return user.orders;
}

module.exports = {
    Item,
    getPaginated,
    User,
    Order,
    getUserOrders,
    getPaginatedSearch,
};
