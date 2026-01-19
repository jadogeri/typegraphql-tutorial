import { Request, Response, NextFunction } from "express"
import path, { dirname} from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
console.log("__filename:", __filename);
const __dirname = dirname(__filename);
console.log("__dirname:", __dirname);

const swaggerJsonPath = path.join(__dirname, '..', 'swagger.json');
console.log("Serving Swagger JSON from:", swaggerJsonPath);
 
const swaggerMiddleware =  (req: Request, res: Response, next: NextFunction) =>     {
  try {
    console.log("Received request for Swagger JSON:", req.url);

  res.sendFile(swaggerJsonPath, (err) => {
    if (err) {
      console.error("Error sending Swagger JSON file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
} catch (error) {
  console.error("Error in Swagger middleware:", error);
  res.status(500).send("Internal Server Error");
}
};
export default swaggerMiddleware;