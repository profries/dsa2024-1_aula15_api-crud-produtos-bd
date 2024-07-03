const {Client} = require('pg');

const conexao = {
    user:"postgres",
    password:"123456",
    host:"localhost",
    port:5433,
    database:"crud_produtos"
}

async function listar() {
    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query("SELECT * FROM produtos");
    const listaProdutos = result.rows;   
    await cliente.end();
    return listaProdutos;
}

async function inserir(produto) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *";
    const values = [produto.nome, produto.categoria, produto.preco];
    const result = await cliente.query(sql, values);
    const produtoInserido = result.rows[0];
    await cliente.end();
    return (produtoInserido);
}

async function buscarPorId(id) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT * from produtos WHERE id=$1";
    const values = [id];
    const result = await cliente.query(sql, values);
    const produtoEncontrado = result.rows[0];
    await cliente.end();
    return (produtoEncontrado);

}

async function atualizar(id, produto) {
    const sql = 'UPDATE produtos set nome=$1, categoria=$2, preco=$3 WHERE id=$4 RETURNING *'
    const values = [produto.nome, produto.categoria, produto.preco, id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    const produtoAtualizado = result.rows[0];
    await cliente.end();
    return (produtoAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(conexao);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    const produtoDeletado = result.rows[0];
    await cliente.end();
    return (produtoDeletado);
}




module.exports = {
    listar, 
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
