const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName 
    }

    ifEmpty = async () => {
        const res = await fs.promises.readFile(`${this.fileName}`, 'utf-8')
        if (res.length==0){
            return true
        } else {
            return false
        }
    }

    createId = async () => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
                return (res[((res.length)-1)].id+1)}
            else {
                return (1)
            }}
        catch (err) {
            console.log("ERROR!")
            console.log(err)
        }
    }

    save = async (obj) => {
            try {
                if (await this.ifEmpty()==false) {
                    const res = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
                    obj.id= await this.createId()
                    res.push(obj)
                    await fs.promises.writeFile(`./${this.fileName}`, `${JSON.stringify(res)}`)
                    console.log("Objeto guardado con éxito!")
                    return (obj.id)}
                else {
                    obj.id= await this.createId()
                    await fs.promises.writeFile(`./${this.fileName}`, `[${JSON.stringify(obj)}]`)
                    console.log("Objeto guardado con éxito!")
                    return (obj.id)
                }}
            catch (err) {
                console.log("ERROR!")
                console.log(err)
            }
        }

    getById = async (number) => {
        try{
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
                if (res.some(element => element.id==number)) {
                    console.log("Objeto obtenido con éxito!")
                    return (res.find(element => element.id==number))
                } else {
                    console.log("Objeto no encontrado")
                    return (null)
                }
            } else {
                console.log("Archivo vacio")
                return (null)
            }
        }
        catch (err) {
            console.log("ERROR!")
            console.log(err)
        }
    }

    getAll = async () => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
                console.log("Objetos obtenidos con éxito!")
                return (res)
            } else {
                console.log("Archivo vacio")
                return ([])
            }
        }
        catch {
            console.log("ERROR!")
            console.log(err)
        }
    }

    deleteById = async (number) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
                const dlt = res.filter((element)=> element.id!==number)
                await fs.promises.writeFile(`./${this.fileName}`, `${JSON.stringify(dlt)}`)
                console.log("Objeto eliminado con éxito!")
            } else {
                console.log("Archivo vacio")
            }
        }
        catch {
            console.log("ERROR!")
            console.log(err)
        }
    }

    deleteAll = async () => {
        try {
            if (await this.ifEmpty()==false) {
                await fs.promises.writeFile(`./${this.fileName}`, ``)
                console.log ("Objetos eliminados con éxito!")
            } else {
                console.log("Archivo vacio")
            }
        }
        catch {
            console.log("ERROR!")
            console.log(err)
        }
    }
} 


const products = new Contenedor("productos.json")

// Prueba de métodos

products.save({name: "Pera", price: 800, thumbnail:"https://www.herbazest.com/imgs/d/8/7/551784/pera.jpg"})
products.getById(1)
products.getAll()
products.deleteById(2)
products.deleteAll()