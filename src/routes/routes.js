const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandler');
const productInputMiddleware = require('../middleware/productInputMiddleware')

// Prefix all routes with /books
const router = new Router({
  prefix: '/api'
});


// Routes will go here
router.get('/products', productHandler.getProducts);
router.get('/product/:id', productHandler.getProduct);
router.post('/products', productInputMiddleware.productInputMiddlewareCreate, productHandler.save);
router.put('/product/:id', productInputMiddleware.productInputMiddlewareUpdate, productHandler.updatedProduct);
router.delete('/product/:id', productHandler.deletedProduct);
router.get('/product', productHandler.getProductsCondition);

module.exports = router;
