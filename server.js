const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => res.json({
  service: 'reviews-service',
  endpoints: ['POST /reviews/:productId', 'GET /reviews/:productId (renders EJS - XSS sink)']
}));

app.use((err, req, res, next) => {
  if (config.exposeStackTraces) return res.status(500).json({ error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`reviews-service listening on http://localhost:${PORT}`));
