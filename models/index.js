const mongoose = require('mongoose');
// load models

const connect = (uri) => {
  mongoose.connect(uri, { useMongoClient: true })
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1);
  });
};

export default connect;

