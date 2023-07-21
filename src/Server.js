import http from 'http';

import { Router } from "./Router.js"

class Server extends Router {
  _routes = {}
  _callstack = []
  _server

  constructor() {
    super()
    this._initialize()
  }

  _initialize() {
    this._server = http.createServer((req, res) => {
      const currentRoute = `${req.method}:${req.url}`
      
      if (this._chooseRouteCallback(currentRoute)) {
        this._handle(currentRoute, req, res)
      } else {
        res.writeHead(404)
        res.end("404 Not Found")
      }
    })
  }

  _getRouteMiddlewares(routename) {
    const index = this._callstack.indexOf(routename)

    const result = this._callstack
      .slice(0, index)
      .filter(middleware => middleware.startsWith("MID:"))
    
    return result
  }

  _chooseRouteCallback(routename) {
    return this._routes[routename]
  }

  async _handle(routename, req, res) {
    const middlewareNames = this._getRouteMiddlewares(routename);

    const runMiddleware = async (index) => {
      const middlewareName = middlewareNames[index]
      const thereAreMiddlewares = index < middlewareNames.length

      if (thereAreMiddlewares) {
        const middleware = this._routes[middlewareName];
        await middleware(req, res, () => runMiddleware(index + 1));
      } else {
        this._chooseRouteCallback(routename)(req, res);
      }
    };

    runMiddleware(0);
  }

  listen(port, callback) {
    this._server.listen(port, "localhost", callback)
  }
}

export { Server }
