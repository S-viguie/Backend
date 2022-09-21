const express = require('express')
const {products} = require('./index')

const PORT = process.env.PORT || 8080
const app = express ()

//Configuracion 
app.set('views', './views')
app.set('view engine', 'ejs')

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
    res.render('index', {showForm: true, showProducts: false})
})

app.get('/productos', async (req, res)=> {
    const productsAll = await products.getAll()
    res.render('index', {showProducts: true, showForm: false, productsAll: productsAll})
})

app.post('/productos', async (req,res)=> {
    await products.save(req.body)
    res.redirect('/')
})