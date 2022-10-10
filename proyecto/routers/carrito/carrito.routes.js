const express = require('express')
const router = express.Router()
const {card} = require('../../api/carrito.api')

router.post('/', async (req,res)=> {
    res.json(await card.save())
})

router.delete('/:id', async (req,res)=> {
    const {id} = req.params
    res.json(await card.deleteById(id))
})

router.post('/:id/productos', async (req,res)=> {
    const {id} = req.params
    res.json(await card.saveProd(id, req.body))
})

router.get('/:id/productos', async (req,res)=> {
    const {id} = req.params
    res.json(await card.getAll(id))
})

router.delete('/:id/productos/:id_prod', async (req,res)=> {
    const {id} = req.params
    const {id_prod: idP} = req.params
    res.json(await card.deleteProd(id, idP))
})

module.exports= router