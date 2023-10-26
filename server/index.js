const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", usersRouter);

app.listen(9000, () => console.log("Up & Running on port 9000"));
