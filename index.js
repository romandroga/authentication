const server = require("./server");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3001;
server(PORT, (err) => {
  if (err) {
    console.log("Error on listen :", err);
    process.exit(1);
  }
  console.log(`Server is alive on port ${PORT}`);
});
