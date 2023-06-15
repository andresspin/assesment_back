import express from "express";
import jwt from "jsonwebtoken";
import userRouter from "./routes/user.route.js";
import listRouter from "./routes/list.route.js"
import favRouter from "./routes/fav.route.js"

const app = express();
const PORT = process.env.PORT;

//Middleware inyecta info en req.body
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use('/list', listRouter);
app.use("/fav", favRouter);

// Hello endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello API-PRISMA" });
});






// Token generation endpoint
// app.get("/token", (req, res) => {
//   const user = { id: 1, name: "Andres" };
//   const secret = process.env.SECRET;

//   const token = jwt.sign(user, secret);
//   res.send(token);
// });

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
