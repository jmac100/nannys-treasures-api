const model = require('./model')

module.exports = {
  retrieve: async (req, res) => {
    try {
      const poems = await model.find()
      res.status(200).send({ poems })
    } catch (error) {
      res.send({ error })
    }
  },
  addComment: async(req, res) => {
    try {
      const { poemId, comment } = req.body
      const poem = await model.findById(poemId)
      if (poem) {
        poem.comments.push(comment)
        await new model(poem).save()
        res.status(200).send({ poem })
      } else {
        res.status(404).send({ msg: 'poem not found' })
      }
    } catch (error) {
      res.send({ error })
    }
  }
}