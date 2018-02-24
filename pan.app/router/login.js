
const koa = require('koa'),
    router = require('koa-router')();

module.exports = (app) => {
    // 设置mysql
    const db = app.mysql.createPool({
            user: 'root',
            database: 'user_info',
            host: 'localhost',
            password: 'lkh'
        }),
        p = app.wrapper(db);

    // 解析post
    app.use(app.bodyParser());

    // 登陆操作
    router.post(
        '/login',
        async (ctx, next) => {
            const { user, password } = ctx.request.body;
            // mysql
            try {
                let results = await p.query(`SELECT * FROM user WHERE user=${user}`);
                if (results.length === 0) {
                    ctx.response.body = {
                        code: 1,
                        msg: '账号不存在'
                    }
                } else if (results[0].password !== password) {
                    ctx.response.body = {
                        code: 2,
                        msg: '密码错误'
                    }
                } else {
                    ctx.response.body = {
                        code: 3,
                        msg: '登陆成功',
                        name: results[0].name
                    }
                }
            } catch(err) {
                console.log('错误', err);
            }
        }
    );

    // 注册操作
    router.post(
        '/register',
        async (ctx, next) => {
            const { name, user, password } = ctx.request.body;
            // mysql
            try {
                const results = await p.query(`SELECT password FROM user WHERE user=${user}`);
                if (results.length > 0) {
                    ctx.response.body = {
                        code: 1,
                        msg: '账号已存在'
                    }
                } else {
                    try{
                        const results = await p.query(`INSERT INTO user(ID, name, user, password) value(0, ?, ?, ?)`, [name, user, password]);
                        ctx.response.body = {
                            code: 2,
                            msg: '注册成功',
                            data: {
                                name: name
                            }
                        }
                    } catch(err) {
                        console.log(err)
                    }
                }
            } catch(err) {
                console.log(err);
            }
        }
    )

    // 调用路由
    return router;
}