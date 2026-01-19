import swaggerUI from "swagger-ui-express";
import * as swaggerJson from "../swagger.json"; 

const SWAGGER_URL = "https://cdnjs.cloudflare.com";

// Define the custom options
const swaggerOptions = {
  customCssUrl: `${SWAGGER_URL}/swagger-ui.min.css`,
  customJs: [
    `${SWAGGER_URL}/swagger-ui-bundle.min.js`,
    `${SWAGGER_URL}/swagger-ui-standalone-preset.min.js`
  ],
  swaggerOptions: {
    url: "/swagger.json", 
  },
  customSiteTitle: "My API Docs",
};

export { swaggerOptions };