module.exports = function (req, res, next) {
  const url = req.url
  if (url.endsWith('/') && url.length > 1) {
    res.writeHead(301, {Location: url.replace(/\/$/, '')})
    res.end()
  } else if (url.endsWith('.html')) {
    res.writeHead(301, {Location: url.replace('.html', '')})
    res.end()
  } else if (url.match(/favicon.ico|logo.png|robots.txt|.css.map/g)) {
    res.statusCode = 404
    res.statusMessage = 'Not found for sourcemaps'
    res.end()
  } else {
    next()
  }
}
