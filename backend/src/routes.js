const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = Router();

const TasksController = require('./controllers/TasksController');

routes.get('/tasks/list', TasksController.index);

routes.get('/tasks/list/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), TasksController.show);

routes.post('/tasks/create', celebrate({
  [Segments.BODY]: Joi.object().keys({
    type: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
  })
}), TasksController.store);

routes.delete('/tasks/delete/:id', celebrate({

  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), TasksController.destroy);

routes.put('/tasks/update/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), TasksController.update);

module.exports = routes;
