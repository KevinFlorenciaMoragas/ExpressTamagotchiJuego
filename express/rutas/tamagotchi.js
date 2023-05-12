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
  connection.query('SELECT * FROM tamagotchi', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const tamagotchi = {
    happiness: req.body.happiness,
    hunger: req.body.hunger,
    energy: req.body.energy
  };

  connection.query('INSERT INTO tamagotchi SET ?', tamagotchi, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const tamagotchi = {
    happiness: req.body.happiness,
    hunger: req.body.hunger,
    energy: req.body.energy
  };
  connection.query('UPDATE tamagotchi SET ? WHERE id = ?', [tamagotchi, id], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ id: results.insertId });
    }
  });
});
module.exports = router;
