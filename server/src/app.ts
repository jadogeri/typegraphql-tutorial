"reflect-metadata";
import express, { Request, Response } from 'express';
import { connect } from './data-source.js';

const app = express();

await connect(); // Ensure database connection is established

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript and Express!');
});

export default app;