const { Router } = require("express");
const { userRegister, userOrders, userCart, addProductToCart, purchaseCart, userVerify, createProduct } = require("../controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       [Create user]
 *     summary: Here you can create an user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Users'
 * /api/v1/users/{userId}/verify:
 *  post:
 *   tags: [Verify user]
 *   summary: verify your user with the code sended to your email
 *   parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *       required: true
 *       minimun: 1
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/Verify'
 *   responses:
 *     200:
 *         description: OK
 * /api/v1/users/{userId}/orders:
 *  get:
 *    security:
 *     - bearerAuth: []
 *    tags: [Get users orders]
 *    summary: obtains users orders with the id of the route
 *    parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *       required: true
 *       minimun: 1
 *    responses:
 *     200:
 *         description: OK
 * /api/v1/users/{userId}/cart:
 *   get:
 *    security:
 *     - bearerAuth: []
 *    tags: [Get users cart]
 *    summary: obtains user cart and its products with the id of the route
 *    parameters:
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *       required: true
 *       minimun: 1
 *    responses:
 *     200:
 *         description: OK
 *   post:
 *    security:
 *     - bearerAuth: []
 *    tags: [Add product to user cart]
 *    summary: Add a product to the user cart with the quantity, price and the cartId
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/AddToCart'
 *    responses:
 *     200:
 *         description: OK
 *   put:
 *    security:
 *     - bearerAuth: []
 *    tags: [Purchase products in Cart]
 *    summary: Purchase all the products in queue of the user cart
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Purchase'
 *    responses:
 *     200:
 *         description: OK
 * /users/:id/products:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   tags: [Post a product]
 *   summary: Post a product to sell using name, price, availableQty and status
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/CreateProduct'
 *   responses:
 *     201:
 *         description: OK
 */   


router.post("/users",  userRegister);

router.post("/users/:id/verify", userVerify);

router.get("/users/:id/orders", authenticate, userOrders);

router.get("/users/:id/cart", authenticate, userCart);

router.post("/users/:id/products", authenticate, createProduct);

router.post("/users/:id/cart", authenticate, addProductToCart);

router.put("/users/:id/cart", authenticate, purchaseCart);

module.exports = router