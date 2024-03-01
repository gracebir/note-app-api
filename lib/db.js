require('dotenv').config()
const mongoose = require('mongoose')


const db = process.env.MONGO_URI;

mongoose.connect(db,
{ useNewUrlParser: true,
    useUnifiedTopology: true,},
);


module.exports = mongoose;