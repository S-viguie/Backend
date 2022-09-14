const express = require('express')
const {products} = require('../../index')

const router = express.Router()

router.get('/', async (req,res)=> {
    res.json(await products.getAll())
})

router.get('/:id', async (req,res)=> {
    const {id} = req.params
    res.json(await products.getById(id))
})

router.post('/', async (req,res)=> {
    res.json(await products.save(req.body))
})

router.delete('/:id', async (req,res)=> {
    const {id} = req.params
    res.json(await products.deleteById(id))
})

router.put('/:id', async (req,res)=> {
    const {id} = req.params
    res.json(await products.putById(id, req.body))
})

module.exports= router