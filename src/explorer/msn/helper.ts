import { CURRENCY_ID_MAP, CRYPTO_ID_MAP, GLOBAL_INDICES } from './const';
import { getLogger } from '../../core/logger';

const logger = getLogger('MSNHelper');

export function getHeaders(dataSource: string = 'MSN'): Record<string, string> {
    return {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    };
}

export async function getMsnApiKey(version?: string, showLog: boolean = false): Promise<string> {
    const scope = JSON.stringify({
        audienceMode: "adult",
        browser: { browserType: "chrome", version: "0", ismobile: "false" },
        deviceFormFactor: "desktop",
        domain: "www.msn.com",
        locale: { content: { language: "vi", market: "vn" }, display: { language: "vi", market: "vn" } },
        ocid: "hpmsn",
        os: "macos",
        platform: "web",
        pageType: "financestockdetails"
    });

    if (!version) {
        // Default to a known working version if not specified
        // This mimics the Python implementation's default argument
        version = '20240430';
    }

    const url = `https://assets.msn.com/resolver/api/resolve/v3/config/?expType=AppConfig&expInstance=default&apptype=finance&v=${version}.168&targetScope=${scope}`;

    if (showLog) {
        logger.info(`Requesting apikey from ${url}`);
    }

    try {
        const response = await fetch(url, {
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch MSN API key: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        if (!text.trim()) {
            throw new Error("Empty response from MSN API");
        }

        const data = JSON.parse(text);
        
        if (showLog) {
            logger.info(`Response: ${JSON.stringify(data)}`);
        }

        try {
            const apikey = data.configs["shared/msn-ns/HoroscopeAnswerCardWC/default"].properties.horoscopeAnswerServiceClientSettings.apikey;
            return apikey;
        } catch (e) {
            logger.error(`Expected API key structure not found in response: ${e}`);
            throw new Error(`API key not found in MSN response structure: ${e}`);
        }

    } catch (error) {
        logger.error(`Error getting MSN API key: ${error}`);
        throw error;
    }
}

export function getAssetType(symbolId: string): string {
    if (Object.values(CURRENCY_ID_MAP).includes(symbolId)) {
        return "currency";
    } else if (Object.values(CRYPTO_ID_MAP).includes(symbolId)) {
        return "crypto";
    } else if (Object.values(GLOBAL_INDICES).includes(symbolId)) {
        return "index";
    } else {
        return "Unknown";
    }
}
