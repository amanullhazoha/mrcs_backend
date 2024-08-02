const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  text:{
    type:String,
  },
  public_id:{
    type:String,
  },
  link:{
    type:String,
  }
});

const Slider = mongoose.model('slider', sliderSchema);

module.exports = Slider;
