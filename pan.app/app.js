const koa = require('koa'),
      app = new koa(),
      cors = require('koa-cors'); 
      router = require('./router');

app.cookieSession = require('koa-session'),
app.serve = require('koa-static'),
app.bodyParser = require('koa-bodyparser'),
app.render = require('koa-ejs'),
app.wrapper = require('co-mysql'),
app.mysql = require('mysql');

//设置跨域访问
app.use(cors());  

// 路由集中控制
router(app);
// 配置session
app.keys = (function() {
    let arr = [];
    for (var i=0; i<10; i++) {
        arr.push(i + 'pan.app.session');
    }
    return arr;
}())
app.use(app.cookieSession({
    key: app.keys
}, app));

// 渲染模板
// app.render(app, {
//     root: 'views',
//     layout: false,
//     viewExt: 'ejs',
//     cache: false,
//     debug: false
// });

// 静态资源
app.use(app.serve('app/build'));

app.listen(3001);