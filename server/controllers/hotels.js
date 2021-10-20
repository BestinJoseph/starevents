import Hotel from '../model/Hotel.js'

export const getAllHotels = (req, res) => {
  Hotel.find()
    .exec((err, data) => { //populate('')
      if(err) res.status(400).json({errors: err.message, success: false})
      if(!data) {
        res.status(400).json({errors: 'No data found.', success: false})
      } else {
        res.status(200).json({errors: null, success: true, data})
      }
    })
}

export const postHotel = (req, res) => {
  Hotel.findOne({name: req.body.name})
    .exec((err, model) => {
      if(err) res.status(400).json({errors: err.message, success: false})
      if(model) {
        res.status(400).json({errors: 'Hotel aleady exist', success: false})
      } else {
        Hotel.create(req.body, (err, data) => {
          if(err) res.status(400).json({errors: err.message, success: false})
          if(!data) res.status(400).json({errors: 'Failed to save hotel', success: false})
          res.status(200).json({errors: null, success: true, data})
        })
      }
    })
}