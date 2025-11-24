/**
 * DNSE Trading Provider - TypeScript Implementation
 * 
 * Provides trading capabilities through DNSE Securities API
 */

import axios from 'axios';

import { getLogger } from '../../core/logger';

const logger = getLogger('DNSE.Trade');

const BASE_URL = 'https://api.dnse.com.vn';

interface LoginResponse {
  token: string;
}

interface AccountResponse {
  [key: string]: any;
}

interface SubAccountsResponse {
  accounts: Array<{
    accountNumber: string;
    accountType: string;
    [key: string]: any;
  }>;
}

interface AccountBalanceResponse {
  [key: string]: any;
}

export class DNSETradingProvider {
  private token: string | null = null;
  private tradingToken: string | null = null;

  constructor() {
    // No initialization needed
  }

  /**
   * Authenticate the user and obtain a JWT token for API requests
   * 
   * @param username - DNSE username (custody code, email, or phone)
   * @param password - DNSE password
   * @returns Promise of JWT token if successful
   */
  async login(username: string, password: string): Promise<string | null> {
    try {
      const url = `${BASE_URL}/auth-service/login`;
      const payload = {
        username,
        password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<LoginResponse>(url, payload, config);

      if (response.status === 200 && response.data.token) {
        logger.info('Login successfully');
        this.token = response.data.token;
        return this.token;
      } else {
        logger.error('Login failed: No token in response');
        return null;
      }
    } catch (error: any) {
      logger.error(`Login failed: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get the full user profile from DNSE
   * 
   * @returns Promise of user profile data
   */
  async account(): Promise<any | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      const url = `${BASE_URL}/user-service/api/me`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.get<AccountResponse>(url, config);

      if (response.status === 200) {
        logger.info('Get profile successfully');
        return response.data;
      } else {
        logger.error('Get profile failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Get profile failed: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get sub-accounts information
   * 
   * @returns Promise of sub-accounts array
   */
  async subAccounts(): Promise<any[] | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      const url = `${BASE_URL}/order-service/accounts`;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.get<SubAccountsResponse>(url, config);

      if (response.status === 200) {
        return response.data.accounts || [];
      } else {
        logger.error('Get sub-accounts failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get account balance for a specific sub-account
   * 
   * @param subAccount - DNSE sub account number
   * @returns Promise of account balance data
   */
  async accountBalance(subAccount: string): Promise<any | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      const url = `${BASE_URL}/order-service/account-balances/${subAccount}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.get<AccountBalanceResponse>(url, config);

      if (response.status === 200) {
        return response.data;
      } else {
        logger.error('Get account balance failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Trigger an email OTP request to DNSE
   */
  async emailOtp(): Promise<void> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return;
    }

    try {
      const url = `${BASE_URL}/auth-service/otp/email`;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.post(url, {}, config);

      if (response.status === 200) {
        logger.info('Email OTP sent successfully');
      } else {
        logger.error('Email OTP request failed');
      }
    } catch (error: any) {
      logger.error(`Email OTP request failed: ${error.response?.data || error.message}`);
    }
  }

  /**
   * Get trading token for placing orders
   * 
   * @param otp - OTP code from email
   * @returns Promise of trading token
   */
  async getTradingToken(otp: string): Promise<string | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      const url = `${BASE_URL}/auth-service/trading-token`;
      const payload = { otp };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.post<{ tradingToken: string }>(url, payload, config);

      if (response.status === 200 && response.data.tradingToken) {
        logger.info('Got trading token successfully');
        this.tradingToken = response.data.tradingToken;
        return this.tradingToken;
      } else {
        logger.error('Get trading token failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Get trading token failed: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Get current trading token
   */
  getTradingTokenValue(): string | null {
    return this.tradingToken;
  }

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    return this.token !== null;
  }
}
