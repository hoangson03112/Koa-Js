const Router = require("koa-router");
const productHandler = require("../handlers/products/productHandler");
const productInputMiddleware = require("../middleware/productInputMiddleware");
const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  // add: addProduct,
  // update: updateProduct,
  // dele: deleteProduct,
  // limit: limitProducts,
  // sort: sortProducts
} = require("../database/bookRepository");

const router = new Router();
router.get("/products", async (ctx) => {
  const products = getAllProducts();
  await ctx.render("page/products", { products });
});

router.get("/product/:id", async (ctx) => {
  const {id}= ctx.params;
  const product = getOneProduct(id);
  console.log(product);
  await ctx.render("page/product", {product});
});

// Routes will go here
router.get("/api/products", productHandler.getProducts);
router.get("/api/product/:id", productHandler.getProduct);
router.post(
  "/api/products",
  productInputMiddleware.productInputMiddlewareCreate,
  productHandler.save
);
router.put(
  "/api/product/:id",
  productInputMiddleware.productInputMiddlewareUpdate,
  productHandler.updatedProduct
);
router.delete("/api/product/:id", productHandler.deletedProduct);
router.get("/api/product", productHandler.getProductsCondition);

module.exports = router;
