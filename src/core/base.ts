/**
 * Base adapter class for vnstock
 * 
 * Provides base functionality for all adapter classes
 */

import { ProviderRegistry } from './registry';
import { Config } from './config';
import { getLogger } from './logger';

const logger = getLogger('BaseAdapter');

export interface RetryOptions {
  maxAttempts?: number;
  backoffMultiplier?: number;
  minDelay?: number;
  maxDelay?: number;
}

/**
 * Retry wrapper function
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async function (this: any, ...args: any[]) {
    let lastError: Error | undefined;
    const maxAttempts = Config.RETRIES;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxAttempts - 1) {
          const delay = Math.min(
            Config.BACKOFF_MIN * Math.pow(Config.BACKOFF_MULTIPLIER, attempt),
            Config.BACKOFF_MAX
          );
          
          logger.debug(`Retry attempt ${attempt + 1}/${maxAttempts} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }) as T;
}

/**
 * Base adapter class that uses ProviderRegistry
 */
export abstract class BaseAdapter {
  protected _provider: any;
  protected source: string;
  protected symbol?: string;

  constructor(
    protected _module_name: string,
    source: string,
    symbol?: string,
    kwargs?: Record<string, any>
  ) {
    this.source = source;
    this.symbol = symbol;

    // Get provider class from registry
    try {
      const ProviderClass = ProviderRegistry.get(_module_name, source);
      
      // Build initialization arguments
      const initArgs: Record<string, any> = { ...kwargs };
      if (symbol !== undefined) {
        initArgs.symbol = symbol;
      }

      // Instantiate the provider
      this._provider = new ProviderClass(initArgs);
    } catch (error) {
      throw new Error(`Failed to initialize provider: ${(error as Error).message}`);
    }
  }

  /**
   * Generic method delegation with retry support
   */
  protected async callMethod(methodName: string, ...args: any[]): Promise<any> {
    if (!this._provider[methodName]) {
      throw new Error(
        `Source '${this.source}' does not support method '${methodName}'`
      );
    }

    return this._provider[methodName](...args);
  }
}
