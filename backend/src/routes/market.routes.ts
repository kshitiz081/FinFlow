import { Router } from 'express';
import { MarketController } from '../controllers/MarketController';
import { rateLimiter } from '../middleware/rateLimiter';

export function createMarketRoutes(controller: MarketController): Router {
  const router = Router();

  router.get('/market/data', rateLimiter, (req, res) =>
    controller.getMarketData(req, res)
  );

  router.get('/market/stream', (req, res) => controller.subscribe(req, res));

  router.get('/health', (req, res) => controller.getHealth(req, res));

  return router;
}
