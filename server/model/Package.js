import mongoose from 'mongoose'

const packageSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['weekend', 'bachelor', 'bachelorette']
  },
  budget: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['budget', 'standard', 'vip', 'ballerz', 'high rollerz']
  },
  music: {
    type: String,
    enum: ['edm', 'hip-hop', 'top 40']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'all']
  },
  facility: [{
    type: String,
  }],
  venue: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  }
})

export default mongoose.model('packages', packageSchema)