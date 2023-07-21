import myExpress from './src/index.js'
import { router } from './routes.js'

const PORT = 3435
const app = myExpress()

app.import(router)

app.mid((req, res, next) => {
  req.user = { name: "John" }
  return res.end("Middleware")
  next()
})

app.get("/", function (req, res) {
  res.end("Welcome " + req.user.name)
})

app.listen(PORT, () => console.log('listening on port ' + PORT))
