const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add this before server.use(router)
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Handle custom routes
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/productos/:resource/:id/show': '/:resource/:id',
  '/categorias/:resource/:id/show': '/:resource/:id',
  '/sugerencias/:resource/:id/show': '/:resource/:id',
  '/usuarios/:resource/:id/show': '/:resource/:id'
}));

// Add this route for handling POST requests to /usuarios
server.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  const db = router.db; // Access the lowdb instance

  // Ensure 'usuarios' is an array
  if (!Array.isArray(db.get('usuarios').value())) {
    db.set('usuarios', []).write();
  }

  db.get('usuarios').push(nuevoUsuario).write();
  res.status(201).json(nuevoUsuario);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;
