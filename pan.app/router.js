const koa = require('koa'),
      router = require('koa-router')();
      
module.exports = (app) => {
    router.use(require('./router/login')(app).routes());

    // 启动路由
    app.use(router.routes());
    app.use(router.allowedMethods());
}

