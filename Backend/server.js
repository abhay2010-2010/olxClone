require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const connectToDB = require("./src/configs/db");
const userRouter = require("./src/routes/user.routes");
const itemRouter = require("./src/routes/item.routes");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/user', userRouter);
app.use('/items', itemRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to olx app" });
});

app.listen(PORT, async () => {
  try {
    await connectToDB;
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});