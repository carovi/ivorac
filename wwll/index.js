var app = require('express')();
var srv = require('http').createServer(app);
var bodyParser = require('body-parser');

var coordinates = [39, 40, 40, 37, 38, 37, 38, 38, 32]

app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`)
})

// 39 40 40  E S S
// 37 38 37  W N W
// 38 38 32  N N space

app.get('/succ', function (req, res, next) {
  var keyCode = req.query.c
  var index = req.query.s

  if (keyCode == coordinates[index]) {
    if (index == coordinates.length - 1) {
      res.send('4354')
    } else {
      res.send('🙉')
    }
  } else {
    res.send('🙊')
  }
});

srv.listen(process.env.PORT || 3000, function () {
  console.log('Listening on 3000');
});
