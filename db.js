import mongoose from 'mongoose';

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/mini-server', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

async function disconnect() {
    await mongoose.disconnect();
}

export default {
    connect,
    disconnect
};
