const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const catData = await Category.findAll();
  if (!catData) {
    res.status(404).json({message: 'No categories found'});
    return;
  }
  return res.json(catData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const findCat = await Category.findOne({
    where: {
      id: req.params.id
    },
  })
  res.status(200).json(findCat)
});

router.post('/', async (req, res) => {
  // create a new category
  const newCat = await Category.create({
    category_name: req.body.categoryName
  })
  res.status(200).json(newCat)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const changedCat = await Category.update(
    {
      category_name: req.body.categoryName
    },
    {
      where: {
        id: req.params.id
      },
    },
  );
  res.status(200).json(changedCat)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const removedCat = await Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    },
  );
  res.status(200).json(removedCat)
});

module.exports = router;
