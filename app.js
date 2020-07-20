// Import node modules here

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cache = require('./services/cache');

// setup env configuration here
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Router configuration
const {userRoute, blogRoute} = require('./routers/index');

// Connect mongodb
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => {console.log(chalk.bgGreen('Ready to use.'))},
    err => {
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
        process.exit();
    }
);

// Re-check mongo connection error
mongoose.connection.on('error', (err) => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
})

// Express configurations
// app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(userRoute);
app.use(blogRoute);

app.listen(PORT, () => {
    console.log(chalk.green(`Node starter kit is running on ${PORT}`));
})