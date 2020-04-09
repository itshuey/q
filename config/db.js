const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// avoid deprecation error
mongoose.set('useFindAndModify', false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
