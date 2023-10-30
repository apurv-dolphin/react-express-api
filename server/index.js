const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const mongoUSerRouter = require("./routes/mongoUserInformation");
const app = express();

require("dotenv").config();

const DB = process.env.DATABASEURL;

const PORT = process.env.PORT;

mongoose
  .connect(DB, {
    dbName: "Apurv-CRUD",
  })
  .then(() => {
    console.log("connection successfully party karo.");
  })
  .catch((err) => {
    console.log("something went to wrong");
  });

app.use(express.json());
app.use(cors());
app.use("/", usersRouter);
app.use("/userinfo", mongoUSerRouter);

app.listen(PORT, () => console.log(`Up & Running on port ${PORT}`));
