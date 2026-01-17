"reflect-metadata";
import "./controllers/category.controller.js";

import express, { Request, Response, Application } from 'express';
import { RegisterRoutes } from "./routes.js";
import * as swaggerJson from "./swagger.json" with { type: 'json' };
import * as swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { corsOptions } from './configs/cors.config.js';

// importing controllers to ensure they are registered

import { bootstrap } from './bootstrap.js';

export const buildApp = () : Application  =>{

  const app: Application = express();

  //middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  // Use the configured CORS middleware
  app.use(cors(corsOptions));
  // Enable pre-flight requests for all routes (necessary when using specific headers/methods)
  //app.options('*', cors(corsOptions) as any); 


  RegisterRoutes(app);

  app.get('/home', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript and Express!');
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'get  received successfully'});
});

app.post('/', (req: Request, res: Response) => {
  res.json({ message: 'post  received successfully'});

}); 

app.delete('/', (req: Request, res: Response) => {
  res.json({ message: 'delete  received successfully'});  
});

app.put('/', (req: Request, res: Response) => {
  res.json({ message: 'put  received successfully'});  
});
  
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(["/openapi", "/docs", "/swagger"], 
  swaggerUI.serve, 
  swaggerUI.setup(swaggerJson, { customCssUrl: CSS_URL })
);

  return app;
    
}

if(process.env.NODE_ENV === 'production'){
  console.log("value of NODE_ENV", process.env.NODE_ENV);
  console.log("⚙️  Building app in production mode");  
  await bootstrap();
}


export default buildApp();


