import Car from '../model/Car.js'

export const getCars = (req, res) => {
  Car.find().exec((err, cars) => {
    if(err) {
      res.status(400).json({errors: err.message, success: false})
    } else {
      if(cars) {
        res.status(200).json({errors: null, success: true, cars})
      } else {
        res.status(400).json({errors: 'failed to load cars', success: false})
      }
    }
  })
}

export const postCar = (req, res) => {
  Car.findOne({name: req.body.name})
    .then( data => {
      if(data) {
        res.status(400).json({errors: 'Car name already exisits.', success: false})
      } else {
        Car.create(req.body, (err, car) => {
          if(err) {
            res.status(400).json({errors: err.message, success: false})
          } else {
            if (car) {
              res.status(400).json({errors: null, success: true, car})
            } else {
              res.status(400).json({errors: 'Car cannot be created.', success: false})
            }
          }
        })
      }
    })
}