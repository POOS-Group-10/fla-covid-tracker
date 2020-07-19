const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const CovidSchema = new Schema({
  county_name: {
    type: String,
    required: true
  },
  state_name: {
    type: String,
    required: true
  },
  confirmed: {
    type: String,
    required: false
  },
  new: {
    type: String,
    required: false
  },
  death: {
    type: String,
    required: true
  },
  new_death: {
    type: String,
    default: Date.now()
  },
  fatality_rate: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: true
  },
  last_update: {
    type: String,
    default: Date.now()
  },
});

// Model
const County = mongoose.model('county', CovidSchema);

module.exports = County;
