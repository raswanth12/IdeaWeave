const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mindMapsRoute = require('./routes/mindMaps');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/mindmapdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/mindmaps', mindMapsRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
