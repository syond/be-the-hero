const express                           = require('express');
const { celebrate, Segments, Joi }      = require('celebrate');

const OngController         = require('./controllers/OngController');
const IncidentsController   = require('./controllers/IncidentsController');
const ProfileController     = require('./controllers/ProfileController');
const SessionController     = require('./controllers/SessionController');

const routes = express.Router();


routes.get('/ongs', OngController.index);


routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name:       Joi.string().required(),
        email:      Joi.string().required().email(),
        whatsapp:   Joi.string().required().min(10).max(11),
        city:       Joi.string().required(),
        uf:         Joi.string().required().length(2),
    })
}), OngController.create);


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentsController.index);


routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title:          Joi.string().required(),
        description:    Joi.string().required(),
        value:          Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization:  Joi.string().required(),
    }).unknown(),
}), IncidentsController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentsController.delete);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);


routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.index)


module.exports = routes;