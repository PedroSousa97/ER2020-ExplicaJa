const dotenv = require("dotenv");
dotenv.config();

// required packages for the API
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const mariadb = require('mariadb');

//import routing files
const userRoutes = require('./routes/user');
const disciplinaRoutes = require('./routes/disciplina');
const precarioRoutes = require('./routes/precario');
const financialRoutes = require('./routes/financial');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Requests origin control and header settings
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
  });

//API routing definitions
app.use('/api/user',userRoutes);
app.use('/api/disciplina',disciplinaRoutes);
app.use('/api/precario',precarioRoutes);
app.use('/api/financial',financialRoutes);


module.exports = app;


