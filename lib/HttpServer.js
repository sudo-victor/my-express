const http = require('http');

class HttpServer {
  _routes = {}
  _server

  constructor() {
    this._initialize()
    this._initializeFuncs()
  }

  _initialize() {
    this._server = http.createServer((req, res) => {
      const currentRoute = `${req.method}:${req.url}`
    
      if (this._chooseRouteCallback(currentRoute)) {
        this._chooseRouteCallback(currentRoute)(req, res)
      } else {
        res.writeHead(404)
        res.end("404 Not Found")
      }
    })
  }

  _initializeFuncs() {
    const methods = ['post', 'put', 'delete', 'get', 'patch']

    methods.forEach(method => {
      this[method] = function (path, callback) {
        const route = `${method.toUpperCase()}:${path}`
        this._routes[route] = callback
      }
    })
  }

  _chooseRouteCallback(routename) {
    return this._routes[routename]
  }

  listen(port, callback) {
    this._server.listen(port, "localhost", callback)
  }
}

module.exports = { HttpServer }
