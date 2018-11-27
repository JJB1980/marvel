const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')

const exphbs = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, '../dist'),
  partialsDir: path.join(__dirname, '../dist'),
  defaultLayout: 'index',
  extname: 'html'
})

const app = express()

app.use(compression())
app.use(express.static(path.join(process.cwd(), 'dist')))
app.use(morgan('tiny'))
app.enable('view cache')

app.set('views', path.resolve(process.cwd(), 'dist'))
app.engine('html', exphbs.engine)
app.set('view engine', 'html')

app.use(express.static('dist'))

const site = process.env.SITE
const environment = process.env.NODE_ENV || 'production'

app.get('*', function (req, res) {
  const host = req.hostname.split('.')[0]
  res.render('index', {theme: site || host, environment})
})

const port = process.env.PORT || 80

app.listen(port, function () {
  console.log('Listening on ' + port)
})
