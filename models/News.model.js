const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const newsSchema = new Schema(
    {
        title: { type: String, required: [true, "Title is required."] },
        description: { type: String, required: [true, "Description is required."] },
        // image: { type: String },
        poster: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "Poster is required."] },
      
      },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const News = model("News", newsSchema);
  
  module.exports = News;