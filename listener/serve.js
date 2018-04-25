const express = require('express')
const app = express()

const O = '%F0%9F%95%BA'

app.get('/', function (req, res) {
  res.send('👀👀👀')
})

app.get('/q1/sheep', function (req, res) {
  res.send('noice')
})

app.get('/q2/SSSWNWNN', function (req, res) {
  res.send('noice')
})

app.get(`/${O}`, function (req, res) {
  res.send('she\'s a sometimes-board sometimes-painter who gifts in white.')
})

app.get(`/${O}${O}`, function (req, res) {
  res.send('spends summers with a Book in his Face. sometimes bearded.')
})

app.get(`/${O}${O}${O}`, function (req, res) {
  res.send('like the previous 🕺, the third and final 🕺 is also a brother. but not that kind of brother.')
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT)
})
