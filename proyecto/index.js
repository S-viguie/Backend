const express = require('express')
const router = require('./routers/app.routers')

const PORT = process.env.PORT || 8080

const app = express ()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', router)

//Server
const server = app.listen(PORT, ()=> {
    console.log(`Server up y corriendo en puerto ${PORT}`)
})

server.on("error", error => console.log(error))