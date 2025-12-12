all data source
```
https://price-streaming-api.vndirect.com.vn/v2/stocks/snapshot?floorCode=10
https://price-streaming-api.vndirect.com.vn/v2/stocks/snapshot?floorCode=02
https://price-streaming-api.vndirect.com.vn/v2/stocks/snapshot?floorCode=03
```

first step decode
```
jsonResponse.map(e => [...e].map((e,i) => String.fromCharCode( e.charCodeAt(0) + i %5)).join(''))
```



index to field sliced code 
```js
{
    m = {
        SFU: e => (0,
        s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "totalRoom", "currentRoom", "inav", "underlyingAsset", "issuer", "exercisePrice", "exerciseRatio", "expiryDate", "time", "bv4", "sv4"], e),
        SBA: e => "ST" === e[1] ? (0,
        s.F8)(["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "totalBidQtty", "totalOfferQtty"], e) : (0,
        s.F8)(["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidQtty01", "bidQtty02", "bidQtty03", "offerPrice01", "offerPrice02", "offerPrice03", "offerQtty01", "offerQtty02", "offerQtty03", "totalBidQtty", "totalOfferQtty", "bv4", "sv4"], e),
        SMA: e => (0,
        s.F8)(["code", "stockType", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom", "iNav"], e),
        SBS: e => "W" === e[1] ? (0,
        s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "underlyingSymbol", "issuerName", "exercisePrice", "exerciseRatio"], e) : (0,
        s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice"], e)
    }
        , g = {
        SFU: e => {
            let t = e[1];
            return "ST" === t ? (0,
            s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "totalBidQtty", "totalOfferQtty", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom"], e) : "W" === t ? (0,
            s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "underlyingSymbol", "issuerName", "exercisePrice", "exerciseRatio", "bidPrice01", "bidPrice02", "bidPrice03", "bidQtty01", "bidQtty02", "bidQtty03", "offerPrice01", "offerPrice02", "offerPrice03", "offerQtty01", "offerQtty02", "offerQtty03", "totalBidQtty", "totalOfferQtty", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom"], e) : (0,
            s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "bidPrice01", "bidPrice02", "bidPrice03", "bidQtty01", "bidQtty02", "bidQtty03", "offerPrice01", "offerPrice02", "offerPrice03", "offerQtty01", "offerQtty02", "offerQtty03", "totalBidQtty", "totalOfferQtty", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom", "iNav"], e)
        }
        ,
        SBA: e => "ST" === e[1] ? (0,
        s.F8)(["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidPrice04", "bidPrice05", "bidPrice06", "bidPrice07", "bidPrice08", "bidPrice09", "bidPrice10", "bidQtty01", "bidQtty02", "bidQtty03", "bidQtty04", "bidQtty05", "bidQtty06", "bidQtty07", "bidQtty08", "bidQtty09", "bidQtty10", "offerPrice01", "offerPrice02", "offerPrice03", "offerPrice04", "offerPrice05", "offerPrice06", "offerPrice07", "offerPrice08", "offerPrice09", "offerPrice10", "offerQtty01", "offerQtty02", "offerQtty03", "offerQtty04", "offerQtty05", "offerQtty06", "offerQtty07", "offerQtty08", "offerQtty09", "offerQtty10", "totalBidQtty", "totalOfferQtty"], e) : (0,
        s.F8)(["code", "stockType", "bidPrice01", "bidPrice02", "bidPrice03", "bidQtty01", "bidQtty02", "bidQtty03", "offerPrice01", "offerPrice02", "offerPrice03", "offerQtty01", "offerQtty02", "offerQtty03", "totalBidQtty", "totalOfferQtty"], e),
        SMA: e => (0,
        s.F8)(["code", "stockType", "tradingSessionId", "buyForeignQtty", "sellForeignQtty", "highestPrice", "lowestPrice", "accumulatedVal", "accumulatedVol", "matchPrice", "matchQtty", "currentPrice", "currentQtty", "projectOpen", "totalRoom", "currentRoom", "iNav"], e),
        SBS: e => "W" === e[1] ? (0,
        s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice", "underlyingSymbol", "issuerName", "exercisePrice", "exerciseRatio"], e) : (0,
        s.F8)(["code", "stockType", "floorCode", "basicPrice", "floorPrice", "ceilingPrice"], e)
    }
}
```