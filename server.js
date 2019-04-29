'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require ('superagent');
const app = express();
// const pg = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(cors());
// //const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', console.error);
// client.connect();


app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view-engine', 'ejs');


// app.get('/', function(request, response){
//   response.render('index.ejs');
// });
app.get('/', getData);


function getData(request, response){
  const URL = `http://numbersapi.com/9/trivia`;
  superagent.get(URL).then(result => {
    console.log(result.text);
    response.render('index.ejs', {text: result.text})
  }).catch(console.error)
}
app.listen(PORT, () => console.log(`app is up on port ${PORT}`));
