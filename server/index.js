const express = require("express");
const cors = require("cors");
const path = require("path");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const mongoUSerRouter = require("./routes/mongoUserInformation");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const compression = require("compression");
// const verifyToken = require("./Middleware/authentication");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();

const DB = process.env.DATABASEURL;

const PORT = process.env.PORT;

// async function run() {
//   //   const browser = await puppeteer.launch();
//   //   const page = await browser.newPage();
//   //   await page.goto("https://en.wikipedia.org/wiki/Cartoon");

//   //   await page.screenshot({ path: "apurv.png", fullPage: true });
//   //   // await page.pdf({ path: "apurv.pdf", formate: 'A4' });

//   //   await browser.close();
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Placeholder base64-encoded image data (a 1x1 pixel transparent PNG)

//   // Create a data URL for the image
//   const dataUrl =
//     "data:image/png;base64,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";

//   // HTML content with the image
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Base64 Image to PDF</title>
//       </head>
//       <body>
//         <img src="${dataUrl}" alt="Base64 Image">
//       </body>
//     </html>
//   `;

//   // Set content and generate PDF
//   await page.setContent(htmlContent);
//   const pdfBuffer = await page.pdf();

//   // Save the PDF to a file
//   const pdfPath = "output.pdf";
//   await require("fs").promises.writeFile(pdfPath, pdfBuffer);
//   console.log(`PDF created at: ${pdfPath}`);

//   // Close the browser
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
app.use(compression());
app.use("/", usersRouter);
app.use("/userinfo", mongoUSerRouter);
// Use swaggerUi for /doc
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.post("/authenticate", (req, res) => {
  const userToken = req.body.token;
  res.status(200).send({
    msg: "Token created and sent back to the client",
    token: userToken,
  });
});

app.listen(PORT, () => console.log(`Up & Running on port ${PORT}`));
