const fs= require('fs');
const { date } = require('yup');

 function writeFile(content) {
     fs.writeFileSync('./src/database/products.json',JSON.stringify({data:content}));
}
module.exports= writeFile;