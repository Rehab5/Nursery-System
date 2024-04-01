const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const multer= require("multer");
const path=require("path");
const swaggerUi=require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const swaggerDocs=require('./swagger.json');
const teacherRoute = require("./routers/teacherRouter");
const childRoute = require("./routers/childRouter");
const classRoute = require("./routers/classRouter");
const loginRoute = require("./routers/auth");
const authMV = require("./MiddleWare/authVal");

//load env file
dotenv.config();
// Create express server
const server = express();

// Set port number
const port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/NurserySystem")
  .then(() => {
    console.log("DB Connected....");
    // Start the server
    server.listen(port, () => {
      console.log("I am listening..........", port);
    });
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });

  // Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Nursery API",
      description: "Nursery System Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:8080"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js","../routers/teacherRouter.js","../routers/childRouter.js"]
};

// const swaggerDocs = swaggerDoc(swaggerOptions);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// image variables
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    console.log(path.join(__dirname,"images"))
    cb(null,path.join(__dirname,"images"))
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+"-"+ file.originalname)
  }
});
// filter images
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

// Middleware
server.use(morgan("tiny"));
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

server.use("/images",express.static(path.join(__dirname,"images")))
server.use(multer({storage:storage,fileFilter:fileFilter}).single("image"))

// CORS Headers
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});
// Routes
server.use(loginRoute);
server.use(authMV);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

// Not Found Middleware
server.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

// Error Handling Middleware
server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error is ${error}` });
});

module.exports = server;
