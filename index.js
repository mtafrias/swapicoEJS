const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;
const urlApi = 'https://swapi.co/api/';

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {
    let titulos = [];
    axios.default.get(urlApi + 'films/')
        .then((data) => data.data)
        .then((retorno) => {
            retorno.results.forEach((row) => {
                titulos.push(row);
            })
            resp.render('index.ejs', { filmes: titulos });
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
app.get('/:id', (req, resp) => {
    let titulos = [];
    const id = req.params.id;
    axios.default.get(urlApi + 'films/' + id)
        .then((data) => {
            resp.render('table.ejs', { filme: data.data })
        })
        .catch((err) => {
            resp.json({ message: 'Erro' }).status(404);
        })
})
    .listen(port);