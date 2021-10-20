import mongoose from 'mongoose'

const carSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    default: 'exotic cars'
  },
  power: {
    type: String,
    required: true
  },
  speed: {
    type: Number
  },
  time: {
    type: Number
  },
  engine: {
    type: String,
  },
  drive: {
    type: String
  },
  costs: [{type: Number, required: true}]
}, {timestamps: true})

export default mongoose.model('cars', carSchema)
