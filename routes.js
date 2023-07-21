import { Router } from "./src/Router.js"

const router = new Router()

router.get("/teste", (req, res) => {
  res.end("Hello World")
})

export { router }
