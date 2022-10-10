const fs = require('fs')
const {products} = require('./productos.api')

class Carrito {
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

    save = async () => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                const obj = {}
                obj.id = await this.createId()
                obj.timestamps = Date.now()
                obj.productos = []
                res.push(obj)
                await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(res, null, 2)}`)
                console.log("Carrito guardado con éxito!")
                return ({id: obj.id})}
            else {
                const obj = {}
                obj.id = await this.createId()
                obj.timestamps = Date.now()
                obj.productos = []
                await fs.promises.writeFile(`./models/${this.fileName}`, `[${JSON.stringify(obj, null, 2)}]`)
                console.log("Carrito guardado con éxito!")
                return ({id: obj.id})
            }}
        catch (err) {
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
                    return({msg: "Carrito eliminado con éxito!"})
                } else {
                    console.log("Carrito no encontrado")
                    return ({error: 'Carrito no encontrado'})
                }
            } else {
                console.log("Archivo vacio")
            }
        }
        catch {
            console.log("ERROR!")
        }
    }

    saveProd = async (id, body) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                let carr
                const {prod} = await products.getById(body.id)
                if (prod==undefined) {
                    return ({msg: "Producto no encontrado"})
                }
                if (res.some(element => element.id==id)) {
                    carr = res.find((element)=> element.id == id)
                } else {
                    return ({error: 'Carrito no encontrado'})
                }
                carr.productos.push(prod)
                const dlt = res.filter((element)=> element.id != id)
                dlt.push(carr)
                await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(dlt, null, 2)}`)
                return ({msg: "Producto agregado con éxito!"})
            }}
        catch (err) {
            console.log("ERROR!")
        }
    }

    getAll = async (id) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                let carr
                if (res.some(element => element.id==id)) {
                    carr = res.find((element)=> element.id == id)
                } else {
                    return ({error: 'Carrito no encontrado'})
                }
                const prods = carr.productos
                console.log("Productos obtenidos con éxito!")
                return ({productos: prods})
            } else {
                console.log("Archivo vacio")
                return ({})
            }
        }
        catch {
            console.log("ERROR!")
        }
    }

    deleteProd = async (id, idP) => {
        try {
            if (await this.ifEmpty()==false) {
                const res = JSON.parse(await fs.promises.readFile(`./models/${this.fileName}`, 'utf-8'))
                let carr
                if (res.some(element => element.id==id)) {
                    carr = res.find((element)=> element.id == id)
                } else {
                    return ({error: 'Carrito no encontrado'})
                }
                if (carr.productos.some(element => element.id == idP)) {
                    carr.productos = carr.productos.filter((element)=> element.id != idP)
                } else {
                    return ({error: "Producto no encontrado"})
                }
                const dlt = res.filter((element)=> element.id != id)
                dlt.push(carr)
                await fs.promises.writeFile(`./models/${this.fileName}`, `${JSON.stringify(dlt, null, 2)}`)
                return ({msg: "Producto eliminado con éxito!"})
            }}
        catch (err) {
            console.log("ERROR!")
        }
    }
}

const card = new Carrito("carritos.json")

module.exports = {
    card
}