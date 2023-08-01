const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

//Arquivo responsável por fazer a aplicação funcionar.
const app = express()

app.use(
    express.urlencoded({ extended: true })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//Criação de rotas e suas respectivas lógicas.
//Rota de casdastro.
app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    if (title === '' || pageqty === '') {
        console.log('Nenhum dado foi encontrado!')
        res.redirect('/')
        return
    }

    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
        }

        console.log('Dados inseridos com sucesso!')
        res.redirect('/books')

    })
})

//Visualização de todos os cadastros.
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"

    pool.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        res.render('books', { books })
    })
})

//Visualização de um respectivo cadastro através do seu ID.
app.get('/book/:id', (req, res) => {

    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })

})

//Rota de edição de um cadastro através do seu ID.
app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', { book })
    })
})

//Valida e envia as alterações feitas
app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title,'pageqty', pageqty, 'id', id]

    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
            return
        }

        console.log('Os dados foram atualizados com sucesso!')
        res.redirect('/books')
    })
})

//Remoção de um cadastro através do seu ID.
app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err)=>{
        if (err) {
            console.log(err)
            return
        }

        console.log('Livro removido com sucesso!')
        res.redirect('/books')
    })
})

//Rota principal.
app.get('/', (req, res) => {
    res.render('home')
})

//Define a porta que será usada pela aplicação.
app.listen(3000, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Aplicação Rodando...')
})