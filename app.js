const express = require('express');
const app = express();
const PORTA = 3000;

const produtoRouter = require('./rotas/produto_rotas');

app.use(express.json()) // for parsing application/json

app.use("/api/produtos", produtoRouter);

app.listen(PORTA, ()=> {
    console.log("Iniciando o servidor na porta "+PORTA);
})
