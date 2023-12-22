
const { data: products } = require("./products.json");
const writeFile = require('../func/function');


function pick(object, keys) {
  return keys.reduce((obj, key) => {
     if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
     }
     return obj;
   }, {});
}
function getAll() {
  return products;
}

function getOne(id,fields) {
          if(fields){
              const field= fields.split(",")
              const product=products.find((product) => product.id === parseInt(id));
              return  pick(product,field);
          }
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
function limitProducts(id,list) {
  return list.slice(0, parseInt(id));
}
function sortProducts(type) {
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
function getProductsList({limit, sort}) {
  if (limit !== undefined && sort !== undefined) {
       const listSorted = sortProducts(sort);
      return limitProducts(limit, listSorted);
  }
  if(sort){
      return sortProducts(sort);
  }
  if(limit){
      return limitProducts(limit,getAll())
  }

}


module.exports = {
  getOne,
  getAll,
  add,
  update,
  dele,
  getProductsList,

};
