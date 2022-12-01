const { UserServices } = require("../services");
const template = require("../template/template");
const transporter = require('../utils/mailer');

const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    const dataCreated = await UserServices.create(newUser);
    const { userCreated, cart } = dataCreated;
    const result = { userCreated: userCreated, cart: cart };
    console.log(result);
    res.status(201).json(result);
    transporter.sendMail({
      from: "<evemele45@gmail.com>",
      to: userCreated.email,
      subject: "Bienvenido a mi Ecommerce",
      text: `¡Hola! ${userCreated.name} bienvenido a la mejor aplicacion de mensajería jamás antes vista`,
      html: template(userCreated.name, userCreated.codeVerifi)
    });
  } catch (error) {
    console.log(error)
    next({
      status: 400,
      errorContent: error,
      message: "Missing data",
    });
  }
};

const userOrders = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await UserServices.getAllOrders(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Invalid data",
    });
  }
}

const userCart = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await UserServices.getCart(id);
    res.status(200).json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Invalid data",
    });
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const newItem = req.body;
    const result = await UserServices.addToCart(newItem);
    res.status(201).json(result);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Missing data",
    });
  }
}

const purchaseCart = async (req, res, next) => {
  try {
    const { cartId } = req.body;
    const result = await UserServices.purchaseCart(cartId);
    res.status(200).json(result)
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "",
    });
  }
}

const userVerify = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { codeVerify } = req.body;
    const result = await UserServices.updateVerify(id, codeVerify);
    if(result) res.status(200).json({status: "user verified", result});
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Verification error, invalid code",
    });
  }
}

module.exports = {
  userRegister,
  userOrders,
  userCart,
  addProductToCart,
  purchaseCart,
  userVerify
};