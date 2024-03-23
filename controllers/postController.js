const ProductModel = require("../models/post")

const getProducts = async (req, res)=>{
    const findAllProducts = await ProductModel.find({})
    res.send(findAllProducts)
    console.log(findAllProducts)
}

const getProductById = async (req, res)=>{
    const id_url = req.params.id
    const findById = await ProductModel.find({id:id_url})
    console.log(findById)
    if (findById[0]) res.send(findById)
    else return res.send("this product does not exist")
    console.log(findById)
}

const creatProduct = async (req, res)=>{
    const {name, price} = req.body
    const findLast = await ProductModel.find().limit(1).sort({id:-1})
	const id = findLast[0].id + 1
	const data = { id: id, name : name, price: price}
    const prd = await ProductModel.create(data)
    await prd.save()
    res.send("created")
}

const updateProduct = async (req, res)=>{
    const id_url = req.params.id
    const { name, price} = req.body
    const prd = await ProductModel.findOneAndUpdate({id: id_url},{$set:{name:name, price: price}})
    if (prd) res.send("Updated")
    else return res.send("this product does not exist")
}  

const deletePorduct = async (req, res)=>{
    const id_url = req.params.id
    const find = await ProductModel.find({id:id_url})
    console.log(find)
    if (find[0]) {
        await ProductModel.deleteOne({id: id_url})
        res.send("the product was deleted")
    }
    else return res.send("this product does not exist")
}
module.exports = {getProducts, getProductById, updateProduct,creatProduct, deletePorduct}