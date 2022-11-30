const app = require("./app");
const  swaggerDocs  = require("../swagger.js")
require("dotenv").config();

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    swaggerDocs(app, PORT)
})