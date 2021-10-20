import mongoose from "mongoose"

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'images'
  }]
}, {timestamps: true})

export default mongoose.model('hotels', hotelSchema)
