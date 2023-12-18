const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("./routes/routes.js");
const render = require("koa-ejs");
const path = require("path");
const app = new Koa();

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.listen(8000);
