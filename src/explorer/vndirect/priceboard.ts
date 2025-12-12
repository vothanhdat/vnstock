import axios from 'axios';

export interface VNDirectPriceBoardData {
    code: string;
    stockType: string;
    floorCode?: string;
    basicPrice?: number;
    floorPrice?: number;
    ceilingPrice?: number;
    bidPrice01?: number;
    bidPrice02?: number;
    bidPrice03?: number;
    bidPrice04?: number;
    bidPrice05?: number;
    bidPrice06?: number;
    bidPrice07?: number;
    bidPrice08?: number;
    bidPrice09?: number;
    bidPrice10?: number;
    bidQtty01?: number;
    bidQtty02?: number;
    bidQtty03?: number;
    bidQtty04?: number;
    bidQtty05?: number;
    bidQtty06?: number;
    bidQtty07?: number;
    bidQtty08?: number;
    bidQtty09?: number;
    bidQtty10?: number;
    offerPrice01?: number;
    offerPrice02?: number;
    offerPrice03?: number;
    offerPrice04?: number;
    offerPrice05?: number;
    offerPrice06?: number;
    offerPrice07?: number;
    offerPrice08?: number;
    offerPrice09?: number;
    offerPrice10?: number;
    offerQtty01?: number;
    offerQtty02?: number;
    offerQtty03?: number;
    offerQtty04?: number;
    offerQtty05?: number;
    offerQtty06?: number;
    offerQtty07?: number;
    offerQtty08?: number;
    offerQtty09?: number;
    offerQtty10?: number;
    totalBidQtty?: number;
    totalOfferQtty?: number;
    buyForeignQtty?: number;
    sellForeignQtty?: number;
    highestPrice?: number;
    lowestPrice?: number;
    accumulatedVal?: number;
    accumulatedVol?: number;
    matchPrice?: number;
    matchQtty?: number;
    currentPrice?: number;
    currentQtty?: number;
    projectOpen?: number;
    totalRoom?: number;
    currentRoom?: number;
    iNav?: number;
    underlyingSymbol?: string;
    issuerName?: string;
    exercisePrice?: number;
    exerciseRatio?: string;
    tradingSessionId?: string;
    time?: string;
    [key: string]: any;
}

const zip = (keys: string[], values: string[]): VNDirectPriceBoardData => {
    const result: any = {};
    keys.forEach((key, i) => {
        if (values[i] !== undefined && values[i] !== "") {
            // Try to parse number if it looks like one, except for specific fields
            if (["code", "stockType", "floorCode", "underlyingSymbol", "issuerName", "tradingSessionId", "time", "exerciseRatio"].includes(key)) {
                result[key] = values[i];
            } else {
                const num = parseFloat(values[i]);
                result[key] = isNaN(num) ? values[i] : num;
            }
        }
    });
    return result;
};

const MAPPINGS = {
    SFU: (e: string[]) => {
        return zip(
            ["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "totalRoom", "currentRoom", "inav", "underlyingAsset", "issuer", "exercisePrice", "exerciseRatio", "expiryDate", "time", "bv4", "sv4"],
            e
        );
    },
    SBA: (e: string[]) => {
        const t = e[1];
        if (t === "ST") {
            return zip(
                ["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "totalBidQtty", "totalOfferQtty"],
                e
            );
        } else {
            return zip(
                ["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidQtty01", "bidQtty02", "bidQtty03", "offerPrice01", "offerPrice02", "offerPrice03", "offerQtty01", "offerQtty02", "offerQtty03", "totalBidQtty", "totalOfferQtty"],
                e
            );
        }
    },
    SMA: (e: string[]) => {
        return zip(
            ["code", "stockType", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom", "iNav"],
            e
        );
    },
    SBS: (e: string[]) => {
        const t = e[1];
        if (t === "W") {
            return zip(
                ["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "underlyingSymbol", "issuerName", "exercisePrice", "exerciseRatio"],
                e
            );
        } else {
            return zip(
                ["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice"],
                e
            );
        }
    }
};

export class VNDirectPriceBoard {
    private decode(str: string): string {
        return [...str].map((c, i) => String.fromCharCode(c.charCodeAt(0) + i % 5)).join('');
    }

    private parse(str: string): VNDirectPriceBoardData | null {
        const parts = str.split('|');
        const msgType = parts[0];
        const data = parts.slice(1);

        if (MAPPINGS[msgType as keyof typeof MAPPINGS]) {
            return MAPPINGS[msgType as keyof typeof MAPPINGS](data);
        }
        return null;
    }

    public async fetch(floorCode: string): Promise<VNDirectPriceBoardData[]> {
        const url = `https://price-streaming-api.vndirect.com.vn/v2/stocks/snapshot?floorCode=${floorCode}`;
        try {
            const response = await axios.get<string[]>(url);
            const json = response.data;
            
            const results: VNDirectPriceBoardData[] = [];
            for (const item of json) {
                try {
                    const decoded = this.decode(item);
                    const parsed = this.parse(decoded);
                    if (parsed) {
                        results.push(parsed);
                    }
                } catch (e) {
                    console.error(`Error parsing item: ${item}`, e);
                }
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch data from ${url}: ${error}`);
        }
    }
}
