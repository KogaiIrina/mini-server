// import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
// import Router from 'koa-router';
// import bson from 'bson';

// import User from './models/User';
// import Job from './models/Job';
// import Worker from './models/Worker';
// import Payment from './models/Payment';

// app
//   .use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
//   .use(async (ctx, next) => {
//     ctx.response.set('Access-Control-Allow-Origin', '*');
//     ctx.response.set('Access-Control-Allow-Methods', '*');
//     ctx.response.set('Access-Control-Allow-Headers', '*');
//     ctx.response.set('Content-Type', 'application/json');
//     await next();
//   })
//   .use(router.routes())
//   .use(router.allowedMethods());

// app.listen(3005);
