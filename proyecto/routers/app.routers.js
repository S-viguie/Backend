const express = require('express')

const router = express.Router()

const productos = require('./productos/productos.routes')
const carrito = require('./carrito/carrito.routes')

router.use('/productos', productos)
router.use('/carrito', carrito)

router.use('*', (req, res) => {
    res.status(404).send({error: `Ruta ${req.baseUrl}, método ${req.method} no implementada`})
})

module.exports= router