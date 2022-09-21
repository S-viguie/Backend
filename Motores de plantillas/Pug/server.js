const express = require('express')
const {products} = require('./index')

const PORT = process.env.PORT || 8080
const app = express ()

//Configuracion Pug

app.set('views', './views')
app.set('view engine', 'pug')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Server
const server = app.listen(PORT, ()=> {
    console.log(`Server up y corriendo en puerto ${PORT}`)
})

server.on("error", error => console.log(error))

//Solicitudes
app.get('/', (req, res)=> {
    res.render('form', {showForm: true})
})

app.get('/productos', async (req, res)=> {
    const productsAll = await products.getAll()
    res.render('products', {showProducts: true, productsAll: productsAll})
})

app.post('/productos', async (req,res)=> {
    await products.save(req.body)
    res.redirect('/')
})