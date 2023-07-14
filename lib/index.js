const { HttpServer } = require("./HttpServer");

function myExpress() {
  return new HttpServer()
}

module.exports = myExpress