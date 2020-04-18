const connection = require('../database/connection');

module.exports = {
  async upadte(req, res) {
    try {
      const { check } = req.body;
      const { id } = req.params;

      const task = await connection('tasks')
        .where({ id })
        .update({ check });

      return res.json(task);
    } catch (error) {
      return res.json(error);
    }

  },
};
