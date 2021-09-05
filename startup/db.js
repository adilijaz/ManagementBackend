const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/school')
    .then(() => console.log('Connected to MongoDB...'));
}