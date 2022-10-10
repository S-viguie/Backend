const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName 
    }

    ifEmpty = async () => {
        const res = await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8')
        if (res.length==0){
            return true
        } else {
            return false
        }
    }

    createId = async () => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                return (res[((res.length)-1)].id+1)}
            else {
                return (1)
            }}
        catch (err) {
            console.log("ERROR!")
        }
    }

    save = async (obj) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                obj.id = await this.createId()
                obj.timestamps = Date.now()
                obj.price = +(obj.price)
                res.push(obj)
                await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(res, null, 2)}`)
                console.log("Objeto guardado con éxito!")
                return ({id: obj.id})}
            else {
                obj.id= await this.createId()
                await fs.promises.writeFile(`./models/${this.fileName}`, `[${JSON.stringify(obj, null, 2)}]`)
                console.log("Objeto guardado con éxito!")
                return ({id: obj.id})
            }}
        catch (err) {
            console.log("ERROR!")
        }
    }

    getById = async (number) => {
        try{
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                if (res.some(element => element.id==number)) {
                    console.log("Producto obtenido con éxito!")
                    return ({prod: res.find(element => element.id==number)})
                } else {
                    console.log("Objeto no encontrado")
                    return ({error: 'Producto no encontrado'})
                }
            } else {
                console.log("Archivo vacio")
                return (null)
            }
        }
        catch (err) {
            console.log("ERROR!")
        }
    }

    getAll = async () => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                console.log("Objetos obtenidos con éxito!")
                return ({prods: res})
            } else {
                console.log("Archivo vacio")
                return ({})
            }
        }
        catch {
            console.log("ERROR!")
        }
    }

    deleteById = async (number) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                if (res.some(element => element.id==number)) {
                    const dlt = res.filter((element)=> element.id!=number)
                    await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(dlt, null, 2)}`)
                    return({msg: "Objeto eliminado con éxito!"})
                } else {
                    console.log("Objeto no encontrado")
                    return ({error: 'producto no encontrado'})
                }
            } else {
                console.log("Archivo vacio")
            }
        }
        catch {
            console.log("ERROR!")
        }
    }

    putById = async (number, obj) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                    if (res.some(element => element.id==number)) {
                    const dlt = res.filter((element)=> element.id!=number)
                    obj.id = +(number)
                    obj.timestamps = Date.now()
                    dlt.push(obj)
                    await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(dlt, null, 2)}`)
                    return({msg: "Objeto actualizado con éxito!"})
                    } else {
                        console.log("Objeto no encontrado")
                        return ({error: 'producto no encontrado'})
                    }
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

module.exports = {
    products
}