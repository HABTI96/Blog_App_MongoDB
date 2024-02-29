const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {getProducts, getProductById, creatProduct, updateProduct, deletePorduct} = require("../controllers/postController")

const verifyToken = (req, res, next)=>{
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(" ")[1]
		if (token == null) return res.sendStatus(401) //unauthorized
		jwt.verify(token, "my_scrt", (err, data)=>{
			if (err) return res.sendStatus(403) //forbidden
			req.user = data
			next()
		})
}
router.get("/", verifyToken, (req, res)=>{
				res.send(`Hello ${req.user.name}\nyou have access to creat or update or delete products`)
})
router.get("/products/:id", verifyToken,getProductById)
router.get("/products", verifyToken,getProducts)
router.post("/products", verifyToken, creatProduct)
router.put("/products/:id",verifyToken, updateProduct)
router.delete("/products/:id", verifyToken, deletePorduct)

module.exports = router;