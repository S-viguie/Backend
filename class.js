class Usuario {
    constructor(name, surname, books, pets) {
        this.nombre = name
        this.apellido = surname
        this.libros = books
        this.mascotas = pets
    }

    getFullName() {
        return console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(pet) {
        this.mascotas.push(pet)
    }

    countMascotas() {
        return console.log(this.mascotas.length)
    }

    addBook(title, author) {
        this.libros.push(
        {
            nombre: title,
            autor: author,
        })
    }

    getBookNames() {
        let bookNames = []
        this.libros.forEach(book => {
            bookNames.push(book.nombre)
        });
        return console.log(bookNames)
    }
}

const usuario = new Usuario("Sebastián", "Viguié", [{nombre:"El señor de las moscas", autor:"William Golding"}, {nombre:"Fundacion", autor:"Isaac Asimov"}], ["Perro", "Gato"]);

usuario.getFullName()

usuario.addMascota("Zorro")

usuario.countMascotas()

usuario.addBook("Titulo1", "Autor Desconocido")

usuario.getBookNames()