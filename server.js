const dotenv = require('dotenv');
const terminate = require('./src/middlewares/terminate');


dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;
const app = require('./src/app');


const mongoConfig = {
    connection: {
        url: process.env.MONGO_API
    },
};
app.dbConnect(mongoConfig)
    .then(() => {
        console.log('-------------------- API is running --------------------');
        console.log('Database connection has been established successfully.');
        const server = app.listen(port, () => {
            console.log(`App running on port ${port}...`);
        });
        const exitHandler = terminate(server, {
            coredump: false,
            timeout: 500
        });

        process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
        process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
        process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
        process.on('SIGINT', exitHandler(0, 'SIGINT'))
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });