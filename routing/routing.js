const { homeRouting } = require("./home");
const { productRouting } = require("./product");
const { logoutRouting } = require("./logout");
const { STATUS_CODE } = require("../constants/statusCode");

const requestRouting = (request, response) => {
  const { method, url } = request;
  const currDate = new Date().toISOString();

  console.log(`INFO [${currDate}] ${method} - ${url}`);

  switch (true) {
    case url === "/":
      homeRouting(method, response);
      break;
    case url.startsWith("/product"):
      productRouting(method, url, request, response);
      break;
    case url === "/logout":
      logoutRouting(method, response);
      break;
    case url === "/kill":
      console.log(`PROCESS [${currDate}]: closing the application`);
      response.end("Application closed");
      process.exit();
    default:
      console.log(`ERROR [${currDate}]: the url dosent exist`);
      response.statusCode = STATUS_CODE.NOT_FOUND;
      response.end("404 PAGE NOT FOUND");
      break;
  }
};

module.exports = {
  requestRouting,
};
