const express = require('express');
const { response } = require('express');

const routes = express.Router();

routes.get('/', (require,response)=>{
    response.send(`hello world!`)
})

module.exports = routes;