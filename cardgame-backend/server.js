const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const comandaRoutes = require('./routes/comandaRoutes');
const itemComandaRoutes = require('./routes/itemComandaRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const tipoProdutoRoutes = require('./routes/tipoProdutoRoutes');

// cors
app.use(cors());

// Middlewares
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/cliente', clienteRoutes);
app.use('/comanda', comandaRoutes);
app.use('/item-comanda', itemComandaRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/tipo-produto', tipoProdutoRoutes);

// Start 
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
