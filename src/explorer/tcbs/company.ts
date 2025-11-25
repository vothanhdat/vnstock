/**
 * TCBS Company Provider - TypeScript Implementation
 * 
 * Provides company information and corporate data from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { TCBSCompanyProfile } from './types';

const logger = getLogger('TCBS.Company');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';
const ANALYSIS_URL = 'tcanalysis';

export class TCBSCompanyProvider {
  private symbol: string;
  private headers: Record<string, string>;
  private showLog: boolean;
  private assetType: string;

  constructor(config?: { symbol?: string; randomAgent?: boolean; showLog?: boolean }) {
    this.symbol = config?.symbol?.toUpperCase() || '';
    this.showLog = config?.showLog !== false;
    this.assetType = this.getAssetType(this.symbol);
    
    // Validate symbol is a stock
    if (this.assetType !== 'STOCK') {
      throw new Error('Invalid symbol. Only stocks have company information.');
    }
    
    this.headers = {
      'User-Agent': config?.randomAgent 
        ? this.getRandomUserAgent()
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
    };
  }

  private getRandomUserAgent(): string {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  }

  private getAssetType(symbol: string): string {
    if (symbol.includes('INDEX')) return 'INDEX';
    if (symbol.startsWith('VN30F')) return 'FUTURE';
    return 'STOCK';
  }

  private stripHtml(html: any): any {
    if (typeof html !== 'string') return html;
    
    // Remove HTML tags
    let text = html.replace(/<[^>]*>?/gm, '');
    
    // Replace common HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&acirc;/g, 'â')
      .replace(/&agrave;/g, 'à')
      .replace(/&aacute;/g, 'á')
      .replace(/&atilde;/g, 'ã')
      .replace(/&egrave;/g, 'è')
      .replace(/&eacute;/g, 'é')
      .replace(/&ecirc;/g, 'ê')
      .replace(/&igrave;/g, 'ì')
      .replace(/&iacute;/g, 'í')
      .replace(/&ograve;/g, 'ò')
      .replace(/&oacute;/g, 'ó')
      .replace(/&ocirc;/g, 'ô')
      .replace(/&otilde;/g, 'õ')
      .replace(/&ugrave;/g, 'ù')
      .replace(/&uacute;/g, 'ú')
      .replace(/&yuml;/g, 'ÿ')
      .replace(/&Acirc;/g, 'Â')
      .replace(/&Agrave;/g, 'À')
      .replace(/&Aacute;/g, 'Á')
      .replace(/&Atilde;/g, 'Ã')
      .replace(/&Egrave;/g, 'È')
      .replace(/&Eacute;/g, 'É')
      .replace(/&Ecirc;/g, 'Ê')
      .replace(/&Igrave;/g, 'Ì')
      .replace(/&Iacute;/g, 'Í')
      .replace(/&Ograve;/g, 'Ò')
      .replace(/&Oacute;/g, 'Ó')
      .replace(/&Ocirc;/g, 'Ô')
      .replace(/&Otilde;/g, 'Õ')
      .replace(/&Ugrave;/g, 'Ù')
      .replace(/&Uacute;/g, 'Ú')
      .replace(/&Yuml;/g, 'Ÿ');
      
    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  }

  /**
   * Get company overview information
   * 
   * @returns Promise of company overview data
   */
  async overview(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/ticker/${this.symbol}/overview`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching company overview for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching company overview for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company profile information
   * 
   * @returns Promise of company profile data
   */
  async profile(): Promise<TCBSCompanyProfile> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/overview`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching company profile for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      const data = response.data;
      
      // Clean HTML content in text fields
      if (data) {
        const textFields = [
          'companyProfile', 
          'historyDev', 
          'companyPromise', 
          'businessRisk', 
          'keyDevelopments', 
          'businessStrategies'
        ];
        
        for (const field of textFields) {
          if ((data as any)[field]) {
            (data as any)[field] = this.stripHtml((data as any)[field]);
          }
        }
      }
      
      return data;
    } catch (error: any) {
      logger.error(`Error fetching company profile for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company shareholders information
   * 
   * @returns Promise of shareholders data
   */
  async shareholders(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/large-share-holders`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching shareholders for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching shareholders for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company insider trading information
   * 
   * @returns Promise of insider trading data
   */
  async insiderDeals(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/insider-dealing`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching insider deals for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching insider deals for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company subsidiaries information
   * 
   * @returns Promise of subsidiaries data
   */
  async subsidiaries(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/sub-companies`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching subsidiaries for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching subsidiaries for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company officers information
   * 
   * @returns Promise of officers data
   */
  async officers(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/key-officers`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching officers for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching officers for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company events information
   * 
   * @returns Promise of events data
   */
  async events(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/events`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching events for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching events for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get company news information
   * 
   * @returns Promise of news data
   */
  async news(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/company/${this.symbol}/ticker-news`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching news for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching news for ${this.symbol}:`, error.message);
      throw error;
    }
  }
}
