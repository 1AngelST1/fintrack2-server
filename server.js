const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Configurar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Montar el router en /api
server.use('/api', router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Fintrack2-server corriendo en http://localhost:${PORT}/api`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   - GET    http://localhost:${PORT}/api/users`);
  console.log(`   - GET    http://localhost:${PORT}/api/categories`);
  console.log(`   - GET    http://localhost:${PORT}/api/transactions`);
  console.log(`   - GET    http://localhost:${PORT}/api/budgets`);
});
