const express = require('express')
const { resolve, join } = require('path')

const app = express()

app.use('/', express.static(resolve(__dirname, 'build')))

app.get('*', (_, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err)
  } else {
    console.log(`Frontend server running on port ${process.env.PORT}`)
  }
})
