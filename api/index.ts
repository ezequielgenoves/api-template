import 'dotenv/config';
import express from 'express';
import apiRouter from '@routes/router';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter());
app.listen(port, () => console.log(`Server started at ${process.env.SERVER_URL}!`));
