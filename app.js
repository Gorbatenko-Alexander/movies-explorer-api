require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3005, MONGO_URL='mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

app.use(cors());
mongoose.connect(MONGO_URL);
app.use(bodyParser.json());
app.use(requestLogger);

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorHandler'));

app.listen(PORT);
