const express = require('express')
const {products} = require('./index')

const PORT = process.env.PORT || 8080

const app = express ()

const server = app.listen(PORT, ()=> {
    console.log(`Server up y corriendo en puerto ${PORT}`)
})

server.on("error", error => console.log(error))

app.get('/', (req, res)=> {
    res.send("Pagina de inicio")
})

app.get('/productos', async (req,res)=> {
    res.send(await products.getAll())
})

app.get('/productoRandom', async (req, res)=> {
    res.send(await products.getById(Math.floor(Math.random()*3+1)))
})