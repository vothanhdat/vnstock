/**
 * DNSE Trading Provider - TypeScript Implementation
 * 
 * Provides trading capabilities through DNSE Securities API
 */

import axios from 'axios';

import { getLogger } from '../../core/logger';

const logger = getLogger('DNSE.Trade');

const BASE_URL = 'https://api.dnse.com.vn';

export interface LoginResponse {
  token: string;
}

export interface AccountResponse {
  [key: string]: any;
}

export interface SubAccountsResponse {
  accounts: Array<{
    accountNumber: string;
    accountType: string;
    [key: string]: any;
  }>;
}

export interface AccountBalanceResponse {
  [key: string]: any;
}

export interface LoanPackage {
  id: number;
  name: string;
  [key: string]: any;
}

export interface TradeCapacity {
  [key: string]: any;
}

export interface OrderResponse {
  [key: string]: any;
}

export interface DealResponse {
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
   * Get the list of loan packages for a specific sub account
   * 
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of loan packages array
   */
  async loanPackages(subAccount: string, assetType: 'stock' | 'derivative' = 'stock'): Promise<LoanPackage[] | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      let url: string;
      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/v2/accounts/${subAccount}/loan-packages`;
      } else {
        url = `${BASE_URL}/order-service/accounts/${subAccount}/derivative-loan-packages`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        return (response.data as any).loanPackages || [];
      } else {
        logger.error('Get loan packages failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get trade capacities (buying/selling power) for a sub account
   * 
   * @param symbol - Symbol of the asset
   * @param price - Price of the asset, unit is VND
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @param loanPackageId - Loan package ID (if applicable)
   * @returns Promise of trade capacities data
   */
  async tradeCapacities(
    symbol: string,
    price: number,
    subAccount: string,
    assetType: 'stock' | 'derivative' = 'stock',
    loanPackageId?: number
  ): Promise<TradeCapacity | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      let url: string;
      const params: any = {
        symbol,
        price,
        loanPackageId,
      };

      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/accounts/${subAccount}/ppse`;
      } else {
        url = `${BASE_URL}/order-service/accounts/${subAccount}/derivative-ppse`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params,
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        return response.data as TradeCapacity;
      } else {
        logger.error('Get trade capacities failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Place an order for stocks or derivatives
   * 
   * @param subAccount - Sub account number
   * @param symbol - Symbol of the asset
   * @param side - 'buy' or 'sell'
   * @param quantity - Order quantity
   * @param price - Order price
   * @param orderType - Order type (LO, MP, ATO, ATC, etc.)
   * @param loanPackageId - Loan package ID if applicable
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of order info
   */
  async placeOrder(
    subAccount: string,
    symbol: string,
    side: 'buy' | 'sell',
    quantity: number,
    price: number,
    orderType: string,
    loanPackageId?: number,
    assetType: 'stock' | 'derivative' = 'stock'
  ): Promise<OrderResponse | null> {
    if (!this.token || !this.tradingToken) {
      logger.error('Not authenticated or missing trading token. Please login and get trading token first.');
      return null;
    }

    try {
      const sideCode = side === 'buy' ? 'NB' : 'NS';
      let url: string;

      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/v2/orders`;
      } else {
        url = `${BASE_URL}/order-service/derivative/orders`;
      }

      const payload = {
        accountNo: subAccount,
        symbol,
        side: sideCode,
        quantity,
        price,
        orderType,
        loanPackageId,
      };

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Trading-Token': this.tradingToken,
        },
      };

      const response = await axios.post(url, payload, config);

      if (response.status === 200) {
        return response.data as OrderResponse;
      } else {
        logger.error('Place order failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get the list of orders for a specific account
   * 
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of orders list
   */
  async orderList(subAccount: string, assetType: 'stock' | 'derivative' = 'stock'): Promise<OrderResponse[] | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      let url: string;
      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/v2/orders`;
      } else {
        url = `${BASE_URL}/order-service/derivative/orders`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          accountNo: subAccount,
        },
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        logger.info('Order list retrieved');
        return (response.data as any).orders || [];
      } else {
        logger.error('Get order list failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get the details of a specific order
   * 
   * @param orderId - Order ID
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of order details
   */
  async orderDetail(orderId: string, subAccount: string, assetType: 'stock' | 'derivative' = 'stock'): Promise<OrderResponse | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      let url: string;
      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/v2/orders/${orderId}`;
      } else {
        url = `${BASE_URL}/order-service/derivative/orders/${orderId}`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          accountNo: subAccount,
        },
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        return response.data as OrderResponse;
      } else {
        logger.error('Get order detail failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Cancel an order
   * 
   * @param orderId - Order ID
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of cancellation result
   */
  async cancelOrder(orderId: string, subAccount: string, assetType: 'stock' | 'derivative' = 'stock'): Promise<any | null> {
    if (!this.token || !this.tradingToken) {
      logger.error('Not authenticated or missing trading token. Please login and get trading token first.');
      return null;
    }

    try {
      let url: string;
      if (assetType === 'stock') {
        url = `${BASE_URL}/order-service/v2/orders/${orderId}`;
      } else {
        url = `${BASE_URL}/order-service/derivative/orders/${orderId}`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Trading-Token': this.tradingToken,
        },
        params: {
          accountNo: subAccount,
        },
      };

      const response = await axios.delete(url, config);

      if (response.status === 200) {
        logger.info('Order cancelled');
        return response.data;
      } else {
        logger.error('Cancel order failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
      return null;
    }
  }

  /**
   * Get the list of deals for a specific sub account
   * 
   * @param subAccount - DNSE sub account number
   * @param assetType - 'stock' or 'derivative'. Default is 'stock'
   * @returns Promise of deals list
   */
  async dealsList(subAccount: string, assetType: 'stock' | 'derivative' = 'stock'): Promise<DealResponse[] | null> {
    if (!this.token) {
      logger.error('Not authenticated. Please login first.');
      return null;
    }

    try {
      let url: string;
      if (assetType === 'stock') {
        url = `${BASE_URL}/deal-service/deals`;
      } else {
        url = `${BASE_URL}/derivative-core/deals`;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          accountNo: subAccount,
        },
      };

      const response = await axios.get(url, config);

      if (response.status === 200) {
        logger.info('Deals list retrieved');
        return (response.data as any).data || [];
      } else {
        logger.error('Get deals list failed');
        return null;
      }
    } catch (error: any) {
      logger.error(`Error: ${error.response?.data || error.message}`);
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
