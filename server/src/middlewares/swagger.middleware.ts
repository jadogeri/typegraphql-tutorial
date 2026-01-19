import { Request, Response, NextFunction } from "express"
import path, { dirname} from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
console.log("__filename:", __filename);
const __dirname = dirname(__filename);
console.log("__dirname:", __dirname);
 
const swaggerMiddleware =  (req: Request, res: Response, next: NextFunction) =>     {
  res.sendFile(path.join(__dirname, "swagger.json"));
  next();
};
export default swaggerMiddleware;