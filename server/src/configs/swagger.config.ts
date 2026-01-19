
const SWAGGER_URL = "https://cdnjs.cloudflare.com";
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
  

// Define the custom options
const swaggerOptions = {
  //customCssUrl: `${SWAGGER_URL}/swagger-ui.min.css`,
  customCssUrl: CSS_URL,
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