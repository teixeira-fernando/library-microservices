const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

let app

const StartServer = async() => {

    app = express();
    
    await databaseConnection();

    await expressApp(app);
    

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    }) 

}

StartServer();

module.exports = app