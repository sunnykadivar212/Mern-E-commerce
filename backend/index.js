const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

app.use(
  cors({
    origin:
      "https://mern-e-commerce-jm1v-ovdz8mpc0-sunny-kadivars-projects.vercel.app"
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
