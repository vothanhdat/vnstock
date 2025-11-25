import { getLogger } from '../../core/logger';
import { XNO_API_BASE, XNO_LAMBDA_BASE, DEFAULT_TIMEOUT } from './const';

const logger = getLogger('XNO.Config');

export class XNOConfig {
  apiKey: string;
  apiBase: string;
  lambdaBase: string;
  timeout: number;
  showLog: boolean;

  constructor(apiKey?: string, showLog: boolean = true) {
    this.showLog = showLog;
    this.apiKey = apiKey || this.getApiKey();
    this.apiBase = XNO_API_BASE;
    this.lambdaBase = XNO_LAMBDA_BASE;
    this.timeout = DEFAULT_TIMEOUT;
  }

  private getApiKey(): string {
    const apiKey = process.env.XNO_API_KEY || process.env.XNO_TOKEN;

    if (apiKey) {
      if (this.showLog) {
        logger.info("Using API key from environment variables");
      }
      return apiKey;
    }

    const errorMsg = `
      XNO API key not found in environment variables.
      Please set one of the following environment variables:
        - export XNO_API_KEY='your_api_key_here'
        - export XNO_TOKEN='your_api_key_here'
      
      Or pass api_key directly to XNOQuote:
        const quote = new XNOQuote({ symbol: 'ACB', apiKey: 'your_key' });
      
      Contact vnstock to get an API key.
    `;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  getEndpointUrl(endpointName: string, useLambda: boolean = false): string {
    const base = useLambda ? this.lambdaBase : this.apiBase;
    // Ensure base doesn't end with / and endpoint doesn't start with / to avoid double slashes
    // But simple concatenation is usually fine if we are careful with constants
    // The constants in const.ts don't have trailing slash, and endpoints don't have leading slash except stocks_ohlcv
    
    // Let's handle leading slash in endpointName
    const cleanEndpoint = endpointName.startsWith('/') ? endpointName : `/${endpointName}`;
    return `${base}${cleanEndpoint}`;
  }

  getHeaders(): Record<string, string> {
    return {
      "Authorization": this.apiKey,
      "accept": "application/json"
    };
  }
}
