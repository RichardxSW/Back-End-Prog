const {Router} = require('express');
const router = Router()
const Recipes = require('../../models/recipesModel');

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.find()
        if (!recipes) {
            return res.status(404).json({message: 'Not found'})
        }const sorted = recipes.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        }) 
        res.status(200).json(sorted)
    } catch (error) { 
        res.status(500).json({message: error.message})
    }
})


router.post('/', async (req, res) => {
    const recipes = new Recipes(req.body)

    try {
        const newRecipe = await recipes.save()
        if (!newRecipe) {
            return res.status(400).json({message: 'Bad request'})
        }
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
  


router.delete('/:id', async (req, res) => {
    try
    {
        const deletedRecipe = await Recipes.findByIdAndDelete(req.params.id)
        if (!deletedRecipe) {
            return res.status(404).json({message: 'Not found'})
        }
        res.status(200).json(deletedRecipe)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


router.put('/:id', async (req, res) => {
    
    try {
        const updatedRecipe = await Recipes.findByIdAndUpdate(req.params.id, req.body)
        if (!updatedRecipe) {
            return res.status(404).json({message: 'Not found'})
        }
        const update = {...updatedRecipe._doc, ...req.body}
        res.status(200).json(update)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})


module.exports = router

