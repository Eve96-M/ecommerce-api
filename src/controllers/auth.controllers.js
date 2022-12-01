const { AuthServices } = require("../services");


const userLogin = async (req, res, next) => {
    try {
      const credentials = req.body;
      const result = await AuthServices.authenticate(credentials);
      if (result) {
        const { email, password, id} = result.result;
        const user = { email, password, id};
        const token = AuthServices.genToken(user);
        user.token = token;
        res.json({ ...user });
      } else {
        res.status(400).json({ message: "Invalid information" });
      }
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "Invalid email or password",
      });
    }
  };
  
  module.exports = {
    userLogin,
  };
  