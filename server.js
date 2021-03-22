import Koa from 'koa';
import Router from 'koa-router';
import bson from 'bson';
import db from './db';

import User from './models/User';
import Job from './models/Job';
import Worker from './models/Worker';
import Payment from './models/Payment';

db.connect().catch(err => console.error(err));
const app = new Koa();
const router = new Router();
const ObjectId = bson.ObjectId;

router.patch('/paymentprocess/:id', async ctx => {
   await Payment.updateOne({ _id: new ObjectId(ctx.params.id) }, { paid: true });
   ctx.status = 200;
});

router.get('/jobs', async ctx => {
    const date = Number(ctx.request.query.fromTs);
    const recentJobs = await Job.find({ createdAt: { $gt: date } }).lean();
    const workerIds = new Set();
    for (const job of recentJobs) {
        workerIds.add(job.worker);
    }
    const workers = await Worker.find({ _id: { $in: Array.from(workerIds) } }).lean();
    const users = await User.find({ _id: { $in: workers.map(w => w.user) } }).lean();
    for (const worker of workers) {
        worker.user = users.find(u => u._id.equals(worker.user));
    }

    ctx.type = 'application/json';
    ctx.body = JSON.stringify({
        jobs: recentJobs,
        workers
    });
});

router.get('/payments', async ctx => {
    const date = Number(ctx.request.query.fromTs);
    const recentPayments = await Payment.find({ createdAt: { $gt: date } }).lean();
    const workerIds = new Array();
    for (const w of recentPayments) {
        workerIds.push(w.worker);
    }

    const workers = await Worker.find({ _id: { $in: Array.from(workerIds) } }).lean();
    const users = await User.find({ _id: { $in: workers.map(w => w.user) } }).lean();
    for (const worker of workers) {
        worker.user = users.find(u => u._id.equals(worker.user));
    }


    const infoAboutPayments = [];
    for(let i = 0; i < recentPayments.length; i++) {
        const obj = { count: recentPayments[i].amount, worker: recentPayments[i].worker };
        infoAboutPayments.push(obj);
    }


    ctx.type = 'application/json';
    ctx.body = JSON.stringify({
        payments: infoAboutPayments,
        workers
    });
});
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3005);
