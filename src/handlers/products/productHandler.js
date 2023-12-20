const { date } = require("yup");
const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  dele: deleteProduct,
  limit: limitProducts,
  sort: sortProducts
} = require("../../database/bookRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
 function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentBook = getOneProduct(id);
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

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
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

 function getProductsCondition(ctx) {
  try {

    const { limit, sort } = ctx.request.query;
    if (limit) {
      ctx.status = 201;
      ctx.body = {
        data: limitProducts(limit),
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        data: sortProducts(sort),
      };
    }


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
  getProductsCondition
};
