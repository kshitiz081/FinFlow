import Redis from 'ioredis';
import { logger } from '../config/logger';

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export class CacheService {
  private memoryCache = new Map<string, CacheEntry<any>>();

  constructor(private redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await this.redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      logger.debug({ key }, 'Redis get failed, using memory cache');
      return this.getFromMemory<T>(key);
    }
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.debug({ key, ttl }, 'Redis set failed, using memory cache');
      this.setInMemory(key, value, ttl);
    }
  }

  async getOrCompute<T>(
    key: string,
    compute: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const computed = await compute();
    await this.set(key, computed, ttl);
    return computed;
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.debug({ pattern }, 'Redis invalidation failed');
      this.invalidateMemory(pattern);
    }
  }

  private getFromMemory<T>(key: string): T | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    
    return entry.value as T;
  }

  private setInMemory<T>(key: string, value: T, ttl: number): void {
    const expiry = Date.now() + (ttl * 1000);
    this.memoryCache.set(key, { value, expiry });
  }

  private invalidateMemory(pattern: string): void {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    for (const key of this.memoryCache.keys()) {
      if (regex.test(key)) {
        this.memoryCache.delete(key);
      }
    }
  }
}
