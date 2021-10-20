import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production'})

import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import './dbconnection.js'
import './Strategies/LocalStrategy.js'
import './Strategies/JwtStrategy.js'
import './utils/authenticate.js'
//routes
import users from './routes/user.js'
import hotels from './routes/hotel.js'
import clubs from './routes/club.js'
import cars from './routes/car.js'
import helicopters from './routes/helicopter.js'
import packages from './routes/package.js'
import transportations from './routes/transportation.js'

const app = express()
const __dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())
app.use(passport.initialize())

app.use('/api/users', users)
app.use('/api/hotels', hotels)
app.use('/api/clubs', clubs)
app.use('/api/cars', cars)
app.use('/api/helicopters', helicopters)
app.use('/api/packages', packages)
app.use('/api/transportations', transportations)

const port = process.env.PORT || 8000

app.listen(port, () => console.log('server is up on', port))