const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let locationSchemaOptions = {
  toJSON: {
    virtuals: true
  }
}

let locationSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  street_address: String,
  city: String,
  state: String,
  zip: Number,
  type: String,
  phone: String,
  website: String,
}, locationSchemaOptions);

locationSchemaVirtual = locationSchema.virtual('full_address')

locationSchemaVirtual.get(function() {
  return `${this.street_address}, ${this.city}, ${this.state} ${this.zip}`
})

module.exports = mongoose.model('Location', locationSchema);
