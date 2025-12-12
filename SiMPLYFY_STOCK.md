
```javascript
fetch("https://api2.simplize.vn/api/company/screener/filter", {
  "headers": {
   
    "content-type": "application/json",
  },
  "body": JSON.stringify({
    "page": 0,
    "size": 2000,
    "rules": "[{\"id\":\"marketCapVnd\",\"val\":1000000000,\"op\":\">=\"},{\"id\":\"marginOfSafety\",\"val\":20,\"op\":\">=\"}]",
    "sort": "{\"id\":\"marketCapVnd\",\"direction\":\"DESC\"}"
  }),
  "method": "POST",
  "mode": "cors",
}).then(e => e.json()).then(e => console.log(e))

```