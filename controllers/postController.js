const products = require("../products.json")
const ProductModel = require("../models/post")
const fs = require("fs")


function saveData(){
    const js_str = JSON.stringify(products, null , 2)
    fs.writeFileSync("./products.json", js_str)
}

const getProducts = async (req, res)=>{
    res.send(products)
    const findAllProducts = await ProductModel.find({})
    console.log(findAllProducts)
}

const searchForProduct = (req, res)=>{
    const min = req.query.minPrice
    const max = req.query.maxPrice
    const find_product = products.filter(x=> x.price >= min && x.price <= max)
    res.send(find_product)
}
const getProductById = async (req, res)=>{
    const id_url = req.params.id
    const find_id = products.filter(x => x.id == id_url)
	if (find_id[0]) res.send(find_id)
    else res.send("this product does not exist")
    const findById = await ProductModel.find({id:id_url})
    console.log(findById)
}

const creatProduct = async (req, res)=>{
    const {name, price} = req.body
	const id = products.length + 1
	const data = { id: id, name : name, price: price}
    const prd = await ProductModel.create(data)
    products.push(prd)
    await prd.save()
    saveData()
    res.send("created")
}

const updateProduct = async (req, res)=>{
    const id_url = req.params.id
    const { name, price} = req.body
    const find_id = products.filter(x => x.id == id_url)
    if (typeof(find_id[0]) != 'object'){
        res.send("this product doesn't exist!")
        return
    }
    find_id[0].name = name
    find_id[0].price = price
    const prd = await ProductModel.updateOne({id: id_url},{$set:{name:name, price: price}})
    // console.log(products)
    saveData()    
    res.send("Updated")
}  

const deletePorduct = async (req, res)=>{
    const id_url = req.params.id
	const find_id = products.filter(x=>x.id == id_url)
	if (!find_id[0]) return res.send("this product does not exist")
	const find_ndx = products.findIndex(x=>x == find_id[0])
	products.splice(find_ndx, 1)
	res.json(products)

    await ProductModel.deleteOne({id: id_url})
    res.send("the product was deleted")
    saveData()
}
module.exports = {getProducts, getProductById, searchForProduct, updateProduct,creatProduct, deletePorduct}