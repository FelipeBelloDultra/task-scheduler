const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    try {
      const task = await connection('tasks').select('*').where({
        check: "false",
      });

      res.json(task);
    } catch (error) {
      return res.json(error);
    }
  },

   async show(req, res) {
    try {
      const { id } = req.params;

      const task = await connection('tasks')
      .where('id', id).select('*');

      res.json(task);
    } catch (error) {
      return res.json(error);
    }
  },

  async store(req, res) {
    try {
      const { type, title, description } = req.body;

      await connection('tasks').insert({
        type,
        title,
        description,
        check: "false"
      });

      return res.json({ message: 'ok' });
    } catch (error) {
      return res.json(error);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;

      await connection('tasks')
        .where('id', id).delete();

      return res.json({ message: 'ok' });
    } catch (error) {
      return res.json(error)
    }

  },

  async update(req, res) {
    const { id } = req.params;
    const { type, title, description } = req.body;
    try {

      await connection('tasks')
        .where('id', id)
        .update({
          type: type,
          title: title,
          description: description
        });

      return res.json({ message: 'ok' });
    } catch (error) {
      return res.json(error);
    }
  },

};
