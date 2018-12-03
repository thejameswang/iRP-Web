const mongoose = require('mongoose');
// const Date = require('date-and-time')
let Schema = mongoose.Schema;

// let donationSchemaOptions = {
//   toJSON: {
//     virtuals: true
//   }
// }

let donationSchema = new Schema({
  timestamp: { type: Number, default: Date.now},
  location: {
    type: Schema.ObjectId,
    ref: 'Location'
  },
  short_description: String,
  full_description: String,
  value: Number,
  category: {
    type: String,
    enum: ['Clothing', 'Hat', 'Kitchen', 'Electronics', 'Household', 'Other']
  },
  comments: [{type: String}],
  picture: String
});
//
// locationSchemaVirtual = locationSchema.virtual('full_address')
//
// locationSchemaVirtual.get(function() {
//   return `${this.street_address}, ${this.city}, ${this.state} ${this.zip}`
// })

module.exports = mongoose.model('Donation', donationSchema);
