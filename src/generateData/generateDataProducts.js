const faker = require("faker");
const writeFile= require('../func/function')
  function dataProducts() {
    writeFile(generateFakeData());

}

function generateFakeData() {
  const fakeData = [];
  for (let i = 1; i <= 1000; i++) {
    const item ={
      id: i,
      name: faker.name.findName(),
      price: faker.commerce.price(),
      description: faker.random.words(10),
      color: faker.commerce.color(),  
      createdAt: faker.date.past(),
      image: faker.image.imageUrl(),
    };
    fakeData.push(item);
  }
  return fakeData;
}
dataProducts();

