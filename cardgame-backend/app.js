const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco com sucesso!');

    // Sincronize o banco (modo desenvolvimento)
    await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
};

startServer();

module.exports = app;