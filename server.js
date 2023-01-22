const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const dotenv = require("dotenv");
const errorHandler = require('./src/middleware/error')
dotenv.config({ path: "./src/config/config.env" });
const rutas = require("./src/routes/joyas_route");

const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
app.use(errorHandler);
app.use("/", rutas);


const PORT = process.env.portServer;
app.listen(PORT, console.log(`el servidor esta activo en el puerto ${PORT}`));
