//3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Import middleware and modules
const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');

//Import Routes
const wordleRoutes = require('./routes/wordleRoutes');


// Create App
const app = express();
// Add Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add Routes
app.get('/', (req, res) => res.send('Node.js Express Server'));
app.use('/wordle', wordleRoutes);

//Catchalls
app.use(notFound);
app.use(errorHandler);


module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`🍻 Running on PORT ${PORT} 🍻`);
    });
  },
};