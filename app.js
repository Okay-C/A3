const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');


dotenv.config();

const app = express();

// Middleware
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const assignmentRoutes = require('./routes/assignments');
app.use('/assignments', assignmentRoutes);

app.set('views', path.join(__dirname, 'views'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
