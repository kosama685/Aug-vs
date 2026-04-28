import express from 'express';
import { registerHealthRoutes } from './routes/healthRoutes';

export function createServer() {
  const app = express();
  app.use(express.json());
  registerHealthRoutes(app);
  return app;
}
