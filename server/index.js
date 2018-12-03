const express = require('express')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const fs = require('fs')

const cwd = process.cwd()

const exphbs = require('express-handlebars').create({
  layoutsDir: path.join(cwd, 'dist'),
  partialsDir: path.join(cwd, 'dist'),
  defaultLayout: 'index',
  extname: 'html'
})

const app = express()

app.use(compression())
app.use('/assets/', express.static(path.join(cwd, 'dist', 'assets')))
app.use(express.static(path.join(cwd, 'dist', 'assets')))
app.use(morgan('tiny'))
app.enable('view cache')

app.set('views', path.resolve(cwd, 'dist'))
app.engine('html', exphbs.engine)
app.set('view engine', 'html')

const site = process.env.SITE
const environment = process.env.NODE_ENV || 'production'

const config = {}

app.get('*', function (req, res) {
  const host = req.hostname.split('.')[0]
  const {name} = config[host] || {name: 'test'}
  console.log(host, name)
  res.render('index', {theme: site || host, environment, renderedHtml: '', name: name})
})

const port = process.env.PORT || 80

app.listen(port, function () {
  console.log('Listening on ' + port)
})

function acquireConfig () {
  const configs = fs.readdirSync('./sites')
  configs.forEach(cfg => {
    if (fs.lstatSync(path.resolve('./sites', cfg)).isDirectory()) {
      const json = JSON.parse(fs.readFileSync(path.resolve('./sites', cfg, 'config.json')))
      config[cfg] = json
    }
  })
}

acquireConfig()
