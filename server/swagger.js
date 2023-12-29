const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  host: "localhost:7000", // Specify your host here
  basePath: "/",
  // Additional configuration options can be added here if needed
};

swaggerAutogen(outputFile, endpointsFiles, doc);
