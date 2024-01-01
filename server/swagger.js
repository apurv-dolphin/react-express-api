const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  host: "localhost:7000", // Specify your host here
  basePath: "/",
  info: {
    version: "8.1.2", // by default: '1.0.0'
    title: "Apurv Khalas", // by default: 'REST API'
    description: "React js", // by default: ''
  },
  // Additional configuration options can be added here if needed
};

swaggerAutogen(outputFile, endpointsFiles, doc);
