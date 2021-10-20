import mongoose from 'mongoose'

const transportationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['suv', 'van']
  },
  capacity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  extra: {
    type: Number
  },
  surcharge: {
    type: Number
  }
})

export default mongoose.model('transportations', transportationSchema)