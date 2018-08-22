const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001
const app = express()
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const bodyParser = require('body-parser')

module.exports = app

if (process.env.NODE_ENV === 'test') {
	after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findById(id)
		done(null, user)
	} catch (err) {
		done(err)
	}
})

const createApp = () => {
	// logging middleware
	app.use(morgan('dev'))

	// body parsing middleware

	app.use(bodyParser({ limit: '5mb' }))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use(compression())

	// session middleware with passport
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'my best friend is Cody',
			store: sessionStore,
			resave: false,
			saveUninitialized: false
		})
	)
	app.use(passport.initialize())
	app.use(passport.session())

	// auth and api routes
	app.use('/auth', require('./auth'))
	app.use('/api', require('./api'))

	// static file-serving middleware
	app.use(express.static(path.join(__dirname, '..', '/public')))
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static('client/build'))
	}

	// any remaining requests with an extension (.js, .css, etc.) send 404
	app.use((req, res, next) => {
		if (path.extname(req.path).length) {
			const err = new Error('Not found')
			err.status = 404
			next(err)
		} else {
			res.header('Access-Control-Allow-Origin', '*')
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept'
			)
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
			res.header('Access-Control-Request-Method: GET')
			next()
		}
	})

	app.use('*', (req, res) => {
		if (process.env.NODE_ENV === 'production') {
		res.sendFile(path.join(__dirname, '..', 'client/build/public/index.html'))
		}
	})

	// error handling endware
	app.use((err, req, res, next) => {
		console.error(err)
		console.error(err.stack)
		res.status(err.status || 500).send(err.message || 'Internal server error.')
	})
}

const startListening = () => {
	// start listening (and create a 'server' object representing our server)
	const server = app.listen(PORT, '0.0.0.0', () =>
		console.log(`Mixing it up on port ${PORT}`)
	)
}

const syncDb = () => db.sync()

async function bootApp() {
	await sessionStore.sync()
	await syncDb()
	await createApp()
	await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
	bootApp()
} else {
	createApp()
}
