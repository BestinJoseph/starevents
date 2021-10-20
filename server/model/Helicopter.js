import mongoose from 'mongoose'

const helicopterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
  },
  includes: [{type: String}]
}, {timestamps: true})

export default mongoose.model('helicopters', helicopterSchema)