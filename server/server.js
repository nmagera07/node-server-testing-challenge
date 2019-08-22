const express = require('express');

const Users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/users', (req, res) => {
  Users.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/users', (req, res) => {
  Users.insert(req.body).then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    res.status(500).json({ message: 'error'})
  })
})

module.exports = server;