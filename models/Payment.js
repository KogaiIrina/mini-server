import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    paid: Boolean,
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Payment', paymentSchema);
