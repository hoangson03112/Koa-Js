
const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  dele: deleteProduct,
  getProductsList:getProductsList,

} = require("../../database/bookRepository");

function getProducts(ctx) {
  try {
    const products = getAllProducts();
    ctx.body = {
      data: products,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}


function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const {fields}= ctx.request.query;
   
    
    const getCurrentBook = getOneProduct(id,fields);
    if (getCurrentBook) {
      return (ctx.body = {
        data: getCurrentBook,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}


function save(ctx) {
  try {
    const contentRequest = ctx.request.body;
    const postData = {
      ...contentRequest
      , createdAt: new Date()
    }
    addProduct(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

function updatedProduct(ctx) {
  try {
    const { id } = ctx.params;

    const putData = ctx.request.body;
    updateProduct(id, putData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
function deletedProduct(ctx) {
  try {
    const { id } = ctx.params;
    deleteProduct(id);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

function getProductsCondition(ctx) {
  try {
    const {limit,sort} = ctx.request.query;
    

    const products = getProductsList({limit, sort});
    return (ctx.body = {
      data: products,
    });
    
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function renderAllProducts(ctx) {
  try {

    const products = getAllProducts();
    await ctx.render("page/products", { products });

  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function renderProductById(ctx) {
  try {
    const { id } = ctx.params;
    const product = getOneProduct(id);
    await ctx.render("page/product", { product });

  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  save,
  updatedProduct,
  deletedProduct,
  getProductsCondition,
  renderAllProducts,
  renderProductById,
  
};
