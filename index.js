const server = require("./server");
const config = require("./config");

server(config.PORT, (err) => {
  if (err) {
    console.log("Error on listen :", err);
    process.exit(1);
  }
  console.log(`Server is alive on port ${config.PORT}`);
});
