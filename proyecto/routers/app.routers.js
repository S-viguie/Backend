const express = require('express')

const router = express.Router()

const productos = require('./productos/productos.routes')
const carrito = require('./carrito/carrito.routes')

router.use('/productos', productos)
router.use('/carrito', carrito)

module.exports= router