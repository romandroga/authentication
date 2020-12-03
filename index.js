const server = require("./server");
const dotenv = require('dotenv').config()


server(process.env.PORT || 3001, (err) => {
  if (err) {
    console.log("Error on listen :", err);
    process.exit(1);
  }
  console.log(`Server is alive on port ${process.env.PORT || 3001}`);
});
