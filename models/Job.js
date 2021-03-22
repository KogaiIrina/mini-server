import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Job', jobSchema);
