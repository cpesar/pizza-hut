const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Tells Mongoose which db we went to connect to
  // If MONGODB_URI exists, it will use that
  // Otherwise it will short circut to the local MongoDB server's mongodb://localhost/pizza-hut'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hut', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true  
});
//Use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
