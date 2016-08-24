# token bucket (promise)

promise-based token bucket filter implementation for node.js

`npm install token-bucket-promise`

# usage

```js
const TokenBucketFilter = require('token-bucket-promise');
// 10 requests every 2 seconds (2000 ms)
const tbf = new TokenBucketFilter(10, 2000);
const request = require('request-promise');

function makeRequest() {
  tbf.acquire().then(function() {
    return request.get(/* ... */)
  });
}
```
