require("source-map-support").install({ hookRequire: true });

const http = require("http");
const serveHandler = require("serve-handler");
const wrapper = require("./wrapper.marko");
const template = require(global.TEMPLATE_PATH);
const PORT = process.env.PORT || global.PORT;
const assetsMatch = /^\/assets\//;
const serveOptions = {
  directoryListing: false,
  public: global.ASSETS_PATH
};

const server = http.createServer((req, res) => {
  if (assetsMatch.test(req.url)) {
    req.url = req.url.slice(7);
    return serveHandler(req, res, serveOptions);
  }
  res.setHeader("content-type", "text/html");
  wrapper.render({ template }, res);
});

server.listen(PORT);
