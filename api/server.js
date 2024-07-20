// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Add this before server.use(router)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/productos/:resource/:id/show': '/:resource/:id'
}))

// Agrega la ruta para manejar la solicitud POST a /usuarios
server.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  router.db.usuarios.push(nuevoUsuario);
  res.json(nuevoUsuario);
});

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

// Export the Server API
module.exports = server