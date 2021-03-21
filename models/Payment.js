import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
    amount: {
    type: Number,
    required: true
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    }
});

export default mongoose.model('Payment', paymentSchema);
