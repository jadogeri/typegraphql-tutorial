"reflect-metadata";
import express, { Request, Response } from 'express';
import { connect } from './data-source.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connect(); // Ensure database connection is established

// Define a basic route
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

export default app;