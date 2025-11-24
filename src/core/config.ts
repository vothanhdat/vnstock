/**
 * Configuration settings for vnstock library
 */

export class Config {
  // HTTP request settings
  static readonly REQUEST_TIMEOUT = 30000; // milliseconds
  static readonly RETRIES = 3;
  static readonly BACKOFF_MULTIPLIER = 1.0;
  static readonly BACKOFF_MIN = 2000; // milliseconds
  static readonly BACKOFF_MAX = 10000; // milliseconds

  // Caching
  static readonly CACHE_SIZE = 128;

  // Logging
  static LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' = 'info';

  static setLogLevel(level: 'debug' | 'info' | 'warn' | 'error') {
    Config.LOG_LEVEL = level;
  }
}
