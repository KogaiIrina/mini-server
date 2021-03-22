import mongoose from 'mongoose';
const { Schema } = mongoose;

const workerSchema = new Schema({
  accountNumber: {
    type: String,
    required: true
  },
  bankNumber: {
    type: String,
    required: true
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
},  {
  timestamps: true
});

export default mongoose.model('Worker', workerSchema);
