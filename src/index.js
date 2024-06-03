const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// route
const authControllers = require("./routes/AuthController");
const userControllers = require("./routes/UserControllers");
const akunControllers = require("./routes/Admin/AdminAccountController");
const dataSiswaController = require("./routes/Admin/AdminDataSiswaController")

// middleware
const { AuthMiddlewareSiswa, AuthMiddlewareAdmin } = require("./middleware/AuthMiddleware");
const morgan = require("morgan");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/auth", authControllers);

app.use("/siswa", AuthMiddlewareSiswa, userControllers);
app.use("/admin", AuthMiddlewareAdmin, akunControllers);
app.use("/admin", AuthMiddlewareAdmin, dataSiswaController);


app.listen(8080, async () => {
  console.log("App listen on port 8080");
});
