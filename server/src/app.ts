"reflect-metadata";
import "./controllers/category.controller.js";

import express, { Request, Response, Application } from 'express';
import { RegisterRoutes } from "./routes.js";
import * as swaggerJson from "./swagger.json" with { type: 'json' };
import * as swaggerUI from "swagger-ui-express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { corsOptions } from './configs/cors.config.js';

import { bootstrap } from './bootstrap.js';

export const buildApp = (): Application => {

  const app: Application = express();

  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

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

  // CDN URLs for Swagger UI (using version 5.x for modern compatibility)
  const SWAGGER_CDN_BASE = "https://cdnjs.cloudflare.com";

  app.use(["/openapi", "/docs", "/swagger"],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson, {
      customCssUrl: `${SWAGGER_CDN_BASE}/swagger-ui.min.css`,
      customJs: [
        `${SWAGGER_CDN_BASE}/swagger-ui-bundle.min.js`,
        `${SWAGGER_CDN_BASE}/swagger-ui-standalone-preset.min.js`
      ]
    })
  );

  return app;
}

if (process.env.NODE_ENV === 'production') {
  console.log("value of NODE_ENV", process.env.NODE_ENV);
  console.log("⚙️  Building app in production mode");
  await bootstrap();
}

export default buildApp();
