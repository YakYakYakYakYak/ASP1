const express = require('express')
const app = express()
const port = 3000

require("./routes/main")(app);

app.use(express.static('imgs'))
app.engine("html", require("ejs").renderFile);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})