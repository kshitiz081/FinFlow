import { Response } from 'express';
import { logger } from '../config/logger';
import { StreamData } from '../models/types';

export class StreamingService {
  private subscribers: Set<Response> = new Set();

  subscribe(res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    this.subscribers.add(res);
    logger.info(`New subscriber. Total: ${this.subscribers.size}`);

    res.on('close', () => {
      this.subscribers.delete(res);
      logger.info(`Subscriber disconnected. Total: ${this.subscribers.size}`);
    });

    const heartbeat = setInterval(() => {
      if (!res.destroyed) {
        res.write(': heartbeat\n\n');
      } else {
        clearInterval(heartbeat);
      }
    }, 30000);
  }

  broadcast(data: StreamData): void {
    const message = `data: ${JSON.stringify(data)}\n\n`;

    this.subscribers.forEach((res) => {
      if (!res.destroyed) {
        res.write(message);
      }
    });

    logger.debug(`Broadcast to ${this.subscribers.size} subscribers`);
  }

  getSubscriberCount(): number {
    return this.subscribers.size;
  }
}
