import User from './models/User';
import Job from './models/Job';
import Worker from './models/Worker';
import Payment from './models/Payment';

import db from './db';

async function main() {
    await db.connect();

   await User.deleteMany();
   await Job.deleteMany();
   await Worker.deleteMany();
   await Payment.deleteMany();

    const users = await User.insertMany([
        { firstName: 'Elvira', lastName: 'Romanova' },
        { firstName: 'Ivan', lastName: 'Petrov' },
        { firstName: 'Dmitriy', lastName: 'Popov' },
        { firstName: 'Elena', lastName: 'Vasileva' },
        { firstName: 'Eugenij', lastName: 'Sidorov' }
    ]);

    const workers = await Worker.insertMany([
        { accountNumber: '7895115544845723', bankNumber: 'HF755445445661PO', user: users[0]._id },
        { accountNumber: '3473948645065643', bankNumber: 'AMd78455789dfd52', user: users[1]._id },
        { accountNumber: '9526452623651265', bankNumber: '7896RT4452177742', user: users[2]._id },
        { accountNumber: '9851335154487566', bankNumber: 'OP78415545663211', user: users[3]._id },
        { accountNumber: '9856324745566545', bankNumber: 'UI48455755114752', user: users[4]._id }
    ]);

   await Job.insertMany([
        { name: 'website', cost: 4000, worker: workers[0]._id },
        { name: 'app', cost: 20000, worker: workers[1]._id },
        { name: 'server', cost: 6000, worker: workers[2]._id },
        { name: 'word press', cost: 10000, worker: workers[3]._id },
        { name: 'game', cost: 80000, worker: workers[4]._id }
    ]);

    await Payment.insertMany([
        { amount: 4000, worker: workers[0]._id },
        { amount: 20000, worker: workers[1]._id },
        { amount: 6000, worker: workers[2]._id },
        { amount: 10000, worker: workers[3]._id },
        { amount: 8000, worker: workers[4]._id },
    ])



    await db.disconnect();
}

main().catch(err => console.error(err));
