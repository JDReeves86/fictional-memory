const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }]
    });
    if (!catData) {
      res.status(200).json({message: 'No categories found'});
      return;
    }
    res.status(200).json(catData);
  } 
  catch (err) {res.status(500).json(err)}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findCat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!findCat) {
      res.status(200).json({message: 'No categories found'});
      return;
    }
    res.status(200).json(findCat)
  } 
  catch (err) {res.status(500).json(err)}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      category_name: req.body.categoryName
    })
    res.status(200).json(newCat)
  } 
  catch(err) {res.status(500).json(err)}

});

// SEE LINE 66
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const changedCat = await Category.update({
        category_name: req.body.categoryName
      },
      {
        where: {
          id: req.params.id
        },
      });
    if (!changedCat) {
        res.status(200).json({message: 'No matching categories found!'});
        return;
    }
    // IF BLOCK DOES NOT APPEAR TO BE DOING ANYTHING? NO ERRORS THROWN, SEEMS TO INDICATE ITEMS CHANGED DESPITE NO ITEM BEING PRESENT.
    res.status(200).json(changedCat)
  }
  catch(err) {res.status(500).json(err)}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const removedCat = await Category.destroy(
      {
        where: {
          id: req.params.id,
        },
      });
    if (!removedCat) {
      res.status(200).json({message: 'No matching categories found!'});
      return;
    }
    res.status(200).json(removedCat)
  } 
  catch (err) {res.status(500).json(err)}
});

module.exports = router;
