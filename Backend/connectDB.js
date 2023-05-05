const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Deepak:deepak@cluster0.uitmtdv.mongodb.net/CropConnect?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("Error connecting to MongoDB Atlas", err);
});