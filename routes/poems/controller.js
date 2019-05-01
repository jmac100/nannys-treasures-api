const model = require('./model')

module.exports = {
  retrieve: async (req, res) => {
    try {
      const poems = await model.find()
      res.status(200).send({ poems })
    } catch (error) {
      res.send({ error })
    }
  }
}