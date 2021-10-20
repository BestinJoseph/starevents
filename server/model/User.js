import mongoose from 'mongoose'
import passportlocalMongoose from 'passport-local-mongoose'

const Session = mongoose.Schema({
  refreshToken: {
    type: String,
    default: ""
  }
})

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  authStrategy: {
    type: String,
    default: "local"
  },
  point: {
    type: Number,
    default: 0
  },
  refreshToken: {
    type: [Session]
  },
  role: {
    type: String,
    default: 'user',
    required: true
  }
}, {timeStamps: true})

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.refreshToken
    return ret
  }
})

userSchema.plugin(passportlocalMongoose)

export default mongoose.model('users', userSchema)