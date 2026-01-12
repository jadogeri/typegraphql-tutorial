import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Define a basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript and Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
