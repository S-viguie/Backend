const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const {products} = require('./index')
const { formatMessage } = require("./utils/utils");

const PORT = process.env.PORT || 8080
const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

//Handlebars
const {engine} = require('express-handlebars')

//Configuracion Handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./views'))

//Server
httpServer.listen(PORT, ()=> {
    console.log(`Server up y corriendo en puerto ${PORT}`)
})


//Solicitudes
app.get('/', (req, res)=> {
    res.sendFile('index.html', {root: __dirname})
})

/* app.get('/productos', async (req, res)=> {
    const productsAll = await products.getAll()
    res.render('index', {showProducts: true, productsAll: productsAll})
})

app.post('/productos', async (req,res)=> {
    await products.save(req.body)
    res.redirect('/')
}) */

//Socket io

const messages = [];
const users = [];

io.on('connection', async (socket) => {
    console.log("Usuario conectado")
    console.log(socket.id)

    socket.emit('products', await products.getAll());

    socket.on('newProduct', async (newProduct) =>{
        console.log(newProduct)
        await products.save(newProduct);
        io.sockets.emit('products', await products.getAll());        
    });   

    io.emit("message", [...messages]);

    socket.on('newUser', (username) =>{
        const newUser = {
            id: socket.id,
            username: username,
        }
        users.push(newUser);
    });

    socket.on("newMessage", (data) =>{
        const user = users.find(user => user.id === socket.id);
        const newMessage = formatMessage(socket.id, user.username, data);
        messages.push(newMessage);
        io.emit('chatMessage', newMessage);
    });

    socket.on("disconnect", () => {
        io.emit("userDisconnected", `${socket.id}`);        
    });
})