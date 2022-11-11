
const mongoose = require("mongoose");

mongoose
  .connect(
    
    "mongodb+srv://root:root@cluster0.4acnh.mongodb.net/healthyDB?authMechanism=DEFAULT",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));