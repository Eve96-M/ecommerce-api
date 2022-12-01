const { Router } = require("express");
const {  getAllProducts } = require("../controllers");

/**
 * @openapi
 * /api/v1/products:
 *  get:
 *   tags: [Get all products in store]
 *   summary: obtain all the products in the catalog differents to 0
 *   responses:
 *     200:
 *       description: OK
 */
const router = Router();

router.get("/products", getAllProducts);

module.exports = router
