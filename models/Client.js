import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema(
  {
    surnameClient: {
      type: String,
      required: [true, 'Please provide company'],
      maxlength: 20,
    },
    nameClient: {
      type: String,
      required: [true, 'Please provide position'],
       minlength: 3,
      maxlength: 20,
    },
    status: {
      type: String,
      enum: ['month', 'threemonths', 'year'],
      default: 'month',
    },
    clientPackage: {
      type: String,
      enum: ['basic', 'premium', 'pro', 'none'],
      default: 'none',
    },
    clientNumber: {
      type: String,
    
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model( 'Client', ClientSchema)
