"reflect-metadata";
import "./controllers/category.controller.js";
import express, { Request, Response, Application } from 'express';
import { RegisterRoutes } from "./routes.js";
import swaggerJson from "./swagger.json" with { type: 'json' };
import * as swaggerUI from "swagger-ui-express";
import cors from 'cors';
import { corsOptions } from './configs/cors.config.js';

import { bootstrap } from './bootstrap.js';
import { configureIoC } from "./configs/ioc.config.js";
import { swaggerOptions } from "./configs/swagger.config.js";
import path, { dirname} from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
console.log("__filename:", __filename);
const __dirname = dirname(__filename);
console.log("__dirname:", __dirname);


if (process.env.NODE_ENV === 'production') {
  console.log("value of NODE_ENV", process.env.NODE_ENV);
  console.log("⚙️  Building app in production mode");
  configureIoC();

  await bootstrap();
}
export const buildApp = (): Application => {

  const app: Application = express();  

  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));

  RegisterRoutes(app);

  app.get('/home', (req: Request, res: Response) => {
    res.send('Hello World with TypeScript and Express!');
  });
  
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'get received successfully' });
  });

  app.post('/', (req: Request, res: Response) => {
    res.json({ message: 'post received successfully' });
  });

  app.delete('/', (req: Request, res: Response) => {
    res.json({ message: 'delete received successfully' });
  });

  app.put('/', (req: Request, res: Response) => {
    res.json({ message: 'put received successfully' });
  });


  app.use(["/openapi", "/docs", "/swagger"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson, swaggerOptions)
  );

  app.get("/swagger.json", (_req, res) => {
    res.sendFile(path.join(__dirname, "swagger.json"));
  });
    
  return app;
}



export default buildApp();
