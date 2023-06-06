const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const serviceSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required."] },
    description: { type: String, required: [true, "Description is required."] },
    contactNumber: { type: String, required: [true, "Contact number is required."] },
    image: { type: String },
    email: { type: String },
    role: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "Poster is required."] },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);

module.exports = Service;