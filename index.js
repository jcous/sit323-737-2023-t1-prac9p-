const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/api");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
