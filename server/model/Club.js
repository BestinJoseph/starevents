import mongoose from 'mongoose'

const clubSchema = mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    unique: true
  },
  clubType: {
    type: String,
    required: true,
    enum: ['Night', 'Day']
  },
  branchLocation: [{
    location: {
      type: String,
      required: true
    },
    openDays: [{
      type: String, 
      required: true
    }],
    hours: {
      type: String,
      required: true
    },
    music: [{
      type: String,
      required: true,
      enum: ['Hip-Hop', 'EDM']
    }],
    bestDays: [{
      type: String,
      required: true
    }],
    dressCoat: {
      type: String
    },
    bottleService: {
      type: Boolean,
      default: true
    },
    bottleCost: {
      type: String,
      default: '$$$'
    },
    description: {
      type: String
    },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images'
    }],
    videos: [{
      type: String
    }]
  }],
  description: {
    type: String
  }
}, {timestamps: true})

export default mongoose.model('clubs', clubSchema)