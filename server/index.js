const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const mongoUSerRouter = require("./routes/mongoUserInformation");
// const verifyToken = require("./Middleware/authentication");
const app = express();

require("dotenv").config();

const DB = process.env.DATABASEURL;

const PORT = process.env.PORT;

// async function run() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://en.wikipedia.org/wiki/Cartoon");

//   await page.screenshot({ path: "apurv.png", fullPage: true });
//   // await page.pdf({ path: "apurv.pdf", formate: 'A4' });

//   await browser.close();
// }

// run();

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

app.post("/authenticate", (req, res) => {
  const userToken = req.body.token;
  res.status(200).send({
    msg: "Token created and sent back to the client",
    token: userToken,
  });
});

app.listen(PORT, () => console.log(`Up & Running on port ${PORT}`));
