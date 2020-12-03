const server = require("./server");
const config = require("./config");


const port = config.PORT || 3001;

server(port, (err) => {
  if (err) {
    console.log("Error on listen :", err);
    process.exit(1);
  }
  console.log(`Server is alive on port ${port}`);
});
