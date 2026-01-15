import express, { Request, Response } from 'express';

const app = express();

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript and Express!');
});

export { app };