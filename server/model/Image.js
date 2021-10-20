import mongoose from "mongoose"

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mimetype: {
    type: String,
    require: true
  },
  path: {
    type: String,
    require: true
  },
  size: {
    type: String,
    default: '2000'
  }
})

export default mongoose.model('images', imageSchema)
