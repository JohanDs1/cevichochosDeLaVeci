Créalo por Ti Mismo


Paso 1
Crea un nuevo repositorio, por ejemplo, CevichochosDeLaVeci. Luego clona ese repositorio vacío.

Paso 2
Necesitas ejecutar el comando npm init:

npm init -y
Esto generará un package.json. Ahora, lo que necesitas hacer es cambiar estas líneas:

Cambia esta línea:

 "main": "index.js",
A esto:

  "main": "api/server.js",
Y esto:

"test": "echo \"Error: no test specified\" && exit 1"
A esto:

"start": "node api/server.js"
Paso 3
Ahora es el momento de ejecutar el comando:

npm install json-server cors
Alt text

Verás que tanto cors como json-server se han agregado al package.json.

Paso 4
Ejecuta el comando:

npm install json-serve
PON ATENCIÓN, YA QUE EL COMANDO DICE SERVE NO SERVER

Agrega el archivo .gitignore y agrega node_modules.

Paso 5
Crea un archivo db.json y agrega tus propios datos.

Además, necesitarás agregar una nueva Carpeta llamada api y, dentro de ella, este archivo server.js:

// Ver https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Agrega esto antes de server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/producto/:recurso/:id/ver': '/:recurso/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('El servidor JSON está funcionando')
})

// Exporta la API del Servidor
module.exports = server
Paso 6
Crea un archivo nuevo llamado vercel.json

{
  "functions": {
    "api/server.js": {
      "memory": 1024,
      "includeFiles": "db.json"
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "api/server.js"
    }
  ]
}
No olvides hacer commit y hacer push a tus cambios 🐣
Ve a tu cuenta de Vercel, crea un nuevo proyecto desde tu repositorio y despliégalo💙

Debes tener paciencia
Puede tomar varios minutos para que funcione correctamente. ⏰🥹
