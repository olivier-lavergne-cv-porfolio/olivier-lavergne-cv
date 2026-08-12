const http = require('https');
http.get('https://olivier-lavergne-cv-porfolio.github.io/olivier-lavergne-cv/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const text = data.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                     .replace(/<[^>]+>/g, '\n')
                     .replace(/\n\s*\n/g, '\n');
    console.log(text.substring(0, 2000));
  });
});
