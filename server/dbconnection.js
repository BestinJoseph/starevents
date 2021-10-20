import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.connection.on('error', error => { throw console.error(error) })
mongoose.connection.once('open', () => {
  console.log('db is up.')
})