const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Middlewares
const sanitizeIds = require('../middlewares/sanitizeIds.js');
const errorHandler = require('../middlewares/errorHandler.js');
const authJwt = require('../middlewares/authJwt');
const requireRole = require('../middlewares/requireRole');

// Rutas
const categoriasRoutes = require('./routes/categorias.js');
const productosRoutes = require('./routes/productos.js');
const clientesRoutes = require('./routes/clientes.js');
const proveedoresRoutes = require('./routes/proveedores.js');
const ventasRoutes = require('./routes/ventas.js');
const comprasRoutes = require('./routes/compras.js');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARES GLOBALES  ==========

// 1. CORS (permitir peticiones desde el frontend)
app.use(cors(
  /*{
  origin: 'http://localhost:5173'
}*/
));

// 2. Parser de JSON
app.use(express.json());

// 3. POST-FILTER: Sanitizar IDs
app.use(sanitizeIds);

// ========== RUTAS ==========
app.get('/authors', (req, res) => {
  res.json([
    { nombre: 'Tu Nombre', codigo: '0000001' },
    { nombre: 'Compañero', codigo: '0000002' },
  ]);
});

app.use('/api', authRouter); // /api/login y /api/me
app.use('/api/categorias', authJwt, requireRole('ADMIN'), categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/compras', comprasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando' });
});

// ========== MIDDLEWARE DE ERRORES  ==========

app.use(errorHandler);

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

module.exports = app;