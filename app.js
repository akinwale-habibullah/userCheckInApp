import express from 'express';
import morgan from 'morgan';
import debug from 'debug';

const port = process.env.PORT || 3000;
const debugg = debug('app');
const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    debugg(`App started and listening on port: ${port}`);
});
