const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();

app.use(express.json());
app.use("/api/usuarios", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
