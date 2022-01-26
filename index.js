'use strict';

require('dotenv').config();

let PORT = process.env.PORT || 6333;

require('./src/app').start(PORT);