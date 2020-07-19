var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lasertag', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
});

module.exports = mongoose;