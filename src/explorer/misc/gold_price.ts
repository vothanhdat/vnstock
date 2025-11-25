import axios from 'axios';
import { getLogger } from '../../core/logger';

const logger = getLogger('MISC.GoldPrice');

export interface GoldPrice {
  name: string;
  branch?: string;
  buy_price: number;
  sell_price: number;
  date?: string;
  [key: string]: any;
}

/**
 * Get gold prices from SJC
 * @param date Date in YYYY-MM-DD format (optional, defaults to today)
 */
export async function sjcGoldPrice(date?: string): Promise<GoldPrice[] | null> {
  try {
    const url = "https://sjc.com.vn/GoldPrice/Services/PriceService.ashx";
    const minDate = new Date('2016-01-02');
    
    let inputDate: Date;
    if (!date) {
      inputDate = new Date();
    } else {
      inputDate = new Date(date);
      if (inputDate < minDate) {
        throw new Error("Date must be from 2016-01-02 onwards.");
      }
    }

    // Format date as DD/MM/YYYY
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const payload = `method=GetSJCGoldPriceByDate&toDate=${formattedDate}`;
    
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Origin': 'https://sjc.com.vn',
        'Referer': 'https://sjc.com.vn/gia-vang-sjc',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 10000
    });

    const data = response.data as any;

    if (response.status === 200 && data.success) {
      const goldData = data.data;
      if (!goldData || goldData.length === 0) {
        logger.warn('No data returned from SJC API');
        return null;
      }

      return goldData.map((item: any) => ({
        name: item.TypeName,
        branch: item.BranchName,
        buy_price: parseFloat(item.BuyValue),
        sell_price: parseFloat(item.SellValue),
        date: date || new Date().toISOString().split('T')[0]
      }));
    } else {
      logger.error('Failed to fetch SJC gold price');
      return null;
    }
  } catch (error: any) {
    logger.error(`Error fetching SJC gold price: ${error.message}`);
    return null;
  }
}

/**
 * Get gold prices from Bao Tin Minh Chau
 */
export async function btmcGoldPrice(): Promise<GoldPrice[] | null> {
  try {
    const url = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';
    const response = await axios.get(url);
    const data = response.data as any;
    
    if (response.status === 200 && data && data.DataList && data.DataList.Data) {
      const dataList = data.DataList.Data;
      
      return dataList.map((item: any) => {
        const row = item['@row'];
        return {
          name: item[`@n_${row}`],
          buy_price: parseFloat(item[`@pb_${row}`]),
          sell_price: parseFloat(item[`@ps_${row}`]),
          date: new Date().toISOString().split('T')[0]
        };
      });
    } else {
      logger.error('Failed to fetch BTMC gold price');
      return null;
    }
  } catch (error: any) {
    logger.error(`Error fetching BTMC gold price: ${error.message}`);
    return null;
  }
}
