const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['poster', 'admin'], default: 'poster' },
    service: [{type: Schema.Types.ObjectId, ref: 'Service'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
