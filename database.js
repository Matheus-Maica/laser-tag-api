var mongoose = require('mongoose');

// endedreço no atlas
// process.env.URI_MONGODB
mongoose.connect(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
});

module.exports = mongoose;