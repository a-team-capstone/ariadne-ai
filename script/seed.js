'use strict'

const db = require('../server/db')
const { User } = require('../server/db/models')

async function seed() {
	await db.sync({ force: true })
	console.log('db synced!')

	const users = await Promise.all([
		User.create({
			userName: 'Cody',
			email: 'cody@email.com',
			password: '123',
			admin: true
		}),
		User.create({
			userName: 'Murph',
			email: 'murphy@email.com',
			password: '123'
		}),
		User.create({
			email: 'cody2@email.com',
			password: '123',
			admin: true
		})
	])

	// await Promise.all(products.map(product => Product.create(product)))
	// await Promise.all(reviews.map(review => Review.create(review)))
	// await Promise.all(photos.map(photo => Photo.create(photo)))
	// await Promise.all(orders.map(order => Order.create(order)))
	// await Promise.all(
	// 	orderProducts.map(orderProduct => OrderProducts.create(orderProduct))
	// )

	console.log(`seeded ${users.length} users`)
	console.log(`seeded successfully`)
}

async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

if (module === require.main) {
	runSeed()
}

module.exports = seed
