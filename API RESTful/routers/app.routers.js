const express = require('express')

const router = express.Router()

const productos = require('./productos/productos.routes')

router.use('/productos', productos)

module.exports= router