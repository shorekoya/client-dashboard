import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model<IClient>('Client', clientSchema);

export default Client;
