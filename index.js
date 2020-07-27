const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const env = require('./config/.env');


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

consign().include('./src/routes').include('./src/functions').into(app);

app.listen(env.PORT_SERVER, env.IP_SERVER, ()=>{

    console.log('servidor rodando!');

});