
const { data: products } = require("./products.json");
const writeFile = require('../func/function');

function getAll() {
  return products;
}

function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

function add(data) {
  const newProducts = [data, ...products];
  return writeFile(newProducts);
}
function update(id, data) {
  const upProducts = products.map((product) => {
    if (product.id === parseInt(id)) {
      return {
        ...product,
        ...data,
      };
    }
    return product;
  });

  return writeFile(
    upProducts
  );
}
function dele(id) {
  const deleProduct = products.filter((product) => {
    if (parseInt(id) != product.id) {
      return product;
    }
  });
  return writeFile(deleProduct);

}
function limit(id) {
  return products.slice(0, parseInt(id));
}
function sort(type) {
  if (type === 'asc' || type === 'desc') {
    const sortedProducts = [...products].sort((a, b) => {
      if (type === 'asc') {
          return a.createdAt.localeCompare(b.createdAt);
      } else {
          return b.createdAt.localeCompare(a.createdAt);
      }
  });
    return sortedProducts;
  }else{
    ctx.status = 400;
    ctx.body = { error: 'Invalid sort parameter' };
  }



}
module.exports = {
  getOne,
  getAll,
  add,
  update,
  dele,
  limit,
  sort
};
