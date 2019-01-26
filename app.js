import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

import guestRouter from './src/routes/guestRoutes';

const port = process.env.PORT || 3000;
const debugg = debug('app');
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/guests', guestRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    debugg(`App started and listening on port: ${port}`);
});
