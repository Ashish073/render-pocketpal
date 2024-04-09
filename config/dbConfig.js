const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URL);


const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Error connecting to database');
});

connection.on('connected', () => {
    console.log('MongoDB connected');
})

module.exports = connection;