const express = require('express');
const app = express();
const partidasRouter = require('./rutas/partidas');
const tamagotchiRouter = require('./rutas/tamagotchi');

app.use(express.json());
app.use('/partidas', partidasRouter);
app.use('/tamagotchi', tamagotchiRouter);
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
