const express = require('express')
const ongController = require('./controllers/ongController')
const incidentController = require('./controllers/incidentsController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')
const routes = express.Router()

routes.post('/sessions', sessionController.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/profile', profileController.index)

routes.post('/incident',incidentController.create)
routes.get('/incident', incidentController.index)
routes.delete('/incident/:id',incidentController.delete)
module.exports = routes