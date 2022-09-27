const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(200).json({message: "No tags found!"});
      return;
    }
    res.json(tagData)
  } 
  catch(err) {res.status(500).json(err)}

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!singleID) {
      res.status(200).json({message: "No tags with that ID found!"});
      return;
    };
    res.status(200).json(singleID)
  } 
  catch(err) {res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tagName
    })
    res.status(200).json(newTag)
  } 
  catch(err) {res.status(500).json(err)}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const removedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!removedTag) {
      res.status(200).json({message: "No tags by that ID found!"});
      return;
    }
    res.status(200).json(removedTag)
  }
  catch(err) {res.status(500).json(err)}
});

module.exports = router;
