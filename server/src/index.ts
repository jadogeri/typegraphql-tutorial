import "reflect-metadata";
import dotenv from "dotenv";
import { buildApp } from "./app.js";
import { bootstrap } from "./bootstrap.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

// Start the server

if(process.env.NODE_ENV !== 'production'){
  console.log("⚙️  Building app in development mode");  
  try{
  bootstrap();
    console.log("✅ Database connected successfully");
    const app = buildApp();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on: http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
    });
  } catch (error: any) {
    console.error("❌ Database connection failed during bootstrap:", error);
  }
}



