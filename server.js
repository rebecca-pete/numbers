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

let searchReply = '';

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view-engine', 'ejs');


// app.get('/', function(request, response){
//   response.render('index.ejs');
// });
app.get('/', getData);

//http://numbersapi.com/2/29/date
function getData(request, response){
  searchReply = '';
  let URL = '';
  for(let i = 0 ; i < 10; i++){
    URL = `http://numbersapi.com/${request.query.number}/math`;
    superagent.get(URL).then(result => {
      searchReply = searchReply + ' ' + result.text;
    })
    URL = `http://numbersapi.com/${request.query.number}/trivia`;
    superagent.get(URL).then(result => {
      searchReply = searchReply + ' ' + result.text;
    })
    let searchDate = request.query.day + '/' + request.query.month;
    URL = `http://numbersapi.com/${searchDate}/date`;
    superagent.get(URL).then(result => {
      console.log('date!');
      searchReply = searchReply + ' ' + result.text;
      console.log(searchReply);
    }).catch(console.error)
  response.render('index.ejs', {text: searchReply});}
}

app.listen(PORT, () => console.log(`app is up on port ${PORT}`));
