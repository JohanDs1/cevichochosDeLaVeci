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
  '/sugerencias/:resource/:id/show': '/:resource/:id'
}));

// Add this route for handling POST requests to /usuarios
server.post('/usuarios', (req, res) => {
  console.log('Solicitud POST recibida en /usuarios');
  console.log('Datos recibidos:', req.body);

  try {
    const nuevoUsuario = req.body;
    const db = router.db;

    // Ensure 'usuarios' is an array
    if (!Array.isArray(db.get('usuarios').value())) {
      db.set('usuarios', []).write();
    }

    // Check that all required fields are present
    if (!nuevoUsuario.id || !nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.role) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // Add the new user to the database
    db.get('usuarios').push(nuevoUsuario).write();
    res.status(201).json(nuevoUsuario);
    console.log('Usuario registrado:', nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;
