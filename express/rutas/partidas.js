const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'monlau21!',
  database: 'kevin_db'
});

connection.connect();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM partidas', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const nuevaPartida = {
    fecha: new Date(),
    jugador: req.body.jugador,
    resultado: req.body.resultado
  };

  connection.query('INSERT INTO partidas SET ?', nuevaPartida, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

module.exports = router;
