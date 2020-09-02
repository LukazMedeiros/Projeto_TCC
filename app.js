const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, ()=>{
    console.log(`aplicação rodando em http://localhost:3333`);
    console.log(`para encerrar a aplicação entre com ctrl+c`);
});