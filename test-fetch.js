// test-fetch.js
const https = require('https');

https.get('https://185.199.108.153/oversight', {
  headers: { Host: 'nicklasfangerfisk.github.io' }
}, res => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Body snippet:', data.slice(0, 300));
  });
}).on('error', err => {
  console.error('Error:', err.message);
});
