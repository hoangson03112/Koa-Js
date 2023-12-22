const Router = require("koa-router");
const productHandler = require("../handlers/products/productHandler");
const productInputMiddleware = require("../middleware/productInputMiddleware");


const router = new Router();
router.get("/products",productHandler.renderAllProducts);
router.get("/product/:id",productHandler.renderProductById);
router.get("/api/products", productHandler.getProducts);
router.get("/api/product/:id", productHandler.getProduct);
router.post("/api/products",productInputMiddleware.productInputMiddlewareCreate,productHandler.save
);
router.put(
  "/api/product/:id",
  productInputMiddleware.productInputMiddlewareUpdate,
  productHandler.updatedProduct
);
router.delete("/api/product/:id", productHandler.deletedProduct);
router.get("/api/product", productHandler.getProductsCondition);
module.exports = router;
