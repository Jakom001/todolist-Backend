const express = require('express');
const router = express.Router();

const {
    getAllItems,
    addItem,
    getItemById,
    updateItem,
    deleteItem,
    toggleCompletion
} = require('../controllers/itemsController')


router.get("/all-items", getAllItems);
router.post('/create-item', addItem);
router.get('/single-item/:id', getItemById);
router.put('/edit-item/:id', updateItem)
router.delete('/delete-item/:id', deleteItem);
router.patch('/toggle-completion/:id', toggleCompletion)

module.exports = router;