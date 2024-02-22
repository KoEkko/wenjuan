const Koa = require("koa");
const Router = require("koa-router");
const MockList = require("./mock/index");


const App = new Koa();
const router = new Router();

async function getRes(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res =fn(ctx);
      resolve(res)
    }, 100)
  })
}

MockList.forEach(item => {
  const { url ,method, response } = item
  router[method](url, async ctx => {
    const res = await getRes(response, ctx);
    ctx.body = res;
  })
})

App.use(router.routes());
App.listen(3001);
