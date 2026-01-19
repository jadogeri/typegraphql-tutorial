import { Request, Response, NextFunction  } from "express";
export const databaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Return a 503 Service Unavailable to trigger a retry instead of a 404
    res.status(503).send("Service Initializing... please refresh in a few seconds.");
  }
}



