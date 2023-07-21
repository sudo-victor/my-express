import {
  methodsHTTP
} from "./constants/httpConstant.js"

class Router {
  _routes = {}
  _callstack = []

  constructor() {
    this._initializeHTTPMethods()
  }

  _initializeHTTPMethods() {
    const methods = methodsHTTP

    methods.forEach(method => {
      this[method] = function (path, callback) {
        const route = `${method.toUpperCase()}:${path}`
        this._callstack.push(route)
        this._routes[route] = callback
      }
    })
  }

  import(config) {
    this._callstack.push(...config.getCallstack())
    this._routes = { ...this._routes, ...config.getRoutes }
  }

  mid(callback) {
    const middlewareName = `MID:${Date.now()}`
    this._callstack.push(middlewareName)
    this._routes[middlewareName] = callback
  }

  getCallstack() {
    return this._callstack
  }

  getRoutes() {
    return this._routes
  }
}

export { Router }
