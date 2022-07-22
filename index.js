

const express = require('express')
const cors = require('cors')
const axios =require('axios')
require('dotenv').config()
const path = require('path');

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3001;


if(process.env.NODE_ENV=='production')
  app.use(express.static(path.resolve(__dirname, 'build')));

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
    
    console.log(`NODE_ENV ${process.env.NODE_ENV}`)
})

app.get('/news',(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://crypto-news-live3.p.rapidapi.com/news',
        headers: {
          'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      };
  
      axios.request(options).then(function (response) {
        const articles = response.data;
        const articles_to_display = [];
        const range = process.env.REACT_APP_RANGE;
        if (articles?.length > 0) {
          for (let i = 0; i < Math.min(range,articles.length); i++) {
            let ind = Math.floor((Math.random() *articles.length));
            articles_to_display.push(articles[ind])
          }
        }
        res.json(articles_to_display)
      }).catch(function (error) {
        console.error(error);
      });
})


app.get('/convert',(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: req.query.from_currency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: req.query.to_currency},
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
        };

        axios.request(options).then(function (response) {
            res.json(Math.round(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]*100)/100);
        }).catch(function (error) {
            console.error(error);
        });
})
