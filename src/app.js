const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const app = express();
app.dbConnect = require('./db/mongo.config');

app.use(cors({
    origin: process.env.CLIENT_HOST,
    allowedHeaders: ['Content-Type', 'Cache-Control', 'Pragma','Authorization'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE', 'HEAD'],
    credentials: true,
    optionsSuccessStatus: 200,
}))

app.options('*', cors());

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/client', require('./routes/clientRouter'));
app.use('/api/v1/provider', require('./routes/providersRouter'));

app.get('/api/v1/_health', (req, res) => {
    res.status(200).send('ok')
})

require('./utils/globalErrorHandler')(app);

module.exports = app;