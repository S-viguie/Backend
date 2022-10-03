const socket = io()

socket.on('products', (products) => {
    fetch('lista.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) =>{
            const template = Handlebars.compile(serverTemplate)
            const html = template({products});
            document.querySelector("#productos").innerHTML = html
        })
});

const prodForm = document.getElementById("formulario")

prodForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const name = document.querySelector("#nombre").value
    const price = document.querySelector("#precio").value
    const thumbnail = document.querySelector("#imagen").value
    const newProduct = {name, price, thumbnail}   

    socket.emit("newProduct", newProduct)
    document.querySelector("#nombre").value ="";
    document.querySelector("#precio").value ="";
    document.querySelector("#imagen").value ="";    
})

const messageList = document.getElementById('messagesList');
const formMessages = document.getElementById('formMessages');
const email = document.getElementById('email');
const message = document.getElementById('message');

document.getElementById('formMessages').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    socket.emit('newUser', username); 
    socket.emit('newMessage', message);
});

socket.on("message", (data) => {
    const html = data.map((user) => {
        let renderMessage = 
            `<p style="padding-top: 0.5rem"><b>
            <span style="color: blue">${user.username}</b></span> 
            <span style="color: brown">[${user.time}]:</span> 
            <span style="color: green"><i>${user.text}</i></span></p>`;        
        return renderMessage;
    })
    .join("\n");
    messageList.innerHTML = html;
});

socket.on('chatMessage', (data) =>{
    const user = data.username;
    const message = data.text;
    socket.on('userDisconnected', () =>{ 
        let renderMsgDesc = `<p style="color: red"><b>Usuario: ${user} desconectado</b></p>`;
        messageList.innerHTML += renderMsgDesc
    });

    let renderMsgChat =
        `<p style="padding-top: 0.3rem"><b>
        <span style="color: blue">${user}</b></span> 
        <span style="color: brown">[${data.time}]:</span> 
        <span style="color:green"><i>${message}</i></span></p>`;
    messageList.innerHTML += renderMsgChat    
});