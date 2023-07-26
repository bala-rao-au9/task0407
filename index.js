 require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes");
const bodyParser = require("body-parser")
const path = require('path');
const { login } = require("./pages/login");
const { home } = require("./pages/home");
const { register } = require("./pages/register");
const { update } = require("./pages/update");


const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the public folder
app.use(express.static(path.join(__dirname, 'public')));
// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// Routes
app.use('/api/user',router);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
        w: 'majority'
      }
    // useCreateIndex: true, // Use 'createIndexes' instead of 'useCreateIndex'
  })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(process.env.PORT || 5000,()=>{
        console.log("Server Started on Port " + process.env.PORT);
    })
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));




// Route for the ejs pages
app.get('/login', login);
app.get('/register', register);
app.get('/', home);
app.get('/profile', update);
   
