const myExpress = require('./lib')

const PORT = 3435
const app = myExpress()

app.get("/", function (req, res) {
  res.end("Welcome")
})

app.listen(PORT, () => console.log('listening on port ' + PORT))
