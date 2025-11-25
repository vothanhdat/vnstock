import { ProviderRegistry } from '../../core/registry';
import { getLogger } from '../../core/logger';
import { getHeaders, getMsnApiKey } from './helper';
import { SYMBOL_INDEX_COLS_MAP } from './const';

const logger = getLogger('MSNListing');

export class MSNListingProvider {
    private apikey: string | null = null;
    private source: string = 'MSN';

    constructor(config?: { randomAgent?: boolean; showLog?: boolean }) {
        // Config handling if needed
    }

    private async ensureApiKey() {
        if (!this.apikey) {
            this.apikey = await getMsnApiKey();
        }
    }

    async searchSymbolId(query: string, locale?: string, limit: number = 10): Promise<any[]> {
        const url = `https://services.bingapis.com/contentservices-finance.csautosuggest/api/v1/Query?query=${query}&market=${locale || ''}&count=${limit}`;
        
        const headers = getHeaders(this.source);
        
        try {
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            const stocks = data.data?.stocks || [];
            
            const result = stocks.map((item: string) => {
                const itemData = JSON.parse(item);
                const mappedItem: any = {};
                
                for (const [key, value] of Object.entries(SYMBOL_INDEX_COLS_MAP)) {
                    if (itemData[key] !== undefined) {
                        mappedItem[value] = itemData[key];
                    }
                }
                return mappedItem;
            });

            if (locale) {
                return result.filter((item: any) => item.locale === locale);
            }
            
            return result;

        } catch (error) {
            logger.error(`Error searching symbol ID: ${error}`);
            throw error;
        }
    }
}

ProviderRegistry.register('listing', 'msn', MSNListingProvider);
