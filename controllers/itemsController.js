const Item = require('../models/itemmodel')
// Get all items
const getAllItems = async (req, res) =>{
    try {
        const items = await Item.find()
        res.status(200).json({success:true, message: "all items", data: items})
    }catch(error){
        console.error("Error fetching items", error);
        res.status(500).json({error: "internal server error"})
    }
}

// Add a new item
const addItem = async (req, res) =>{
    const {name} = req.body;

    // validate name
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name must be a non-empty string.' });
      }
      
    try{
        const newItem = new Item({name});
        await newItem.save();
        res.status(201).json(newItem);

    }catch(error){
        console.error('Error adding item', error);
        res.status(500).json({error: "internal server error"})
    }
};

// Get a single item by ID
const getItemById = async (req,res) =>{
    try{
        const item = await Item.findById(req.params.id);
        if (item){
            res.json(item);
        }else{
            res.status(404).json({error: 'Item not found'})
        }
    }catch (error){
        console.error("Error fetching item by ID:", error);
        res.status(500).json({error: "internal server error"});
    }   
};

// update an item
const updateItem = async (req, res) =>{
    const {name} = req.body;
    // validate name
    if(!name || typeof name !== 'string' || name.trim() === ''){
        return res.status(400).json({error: 'Name must be a non-empty string'})
    }
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, { name }, {new: true});
        
        if(item){
            res.json(item)
        }else{
            res.status(404).json({error: "item not found"})
        }
    }catch (error){
        console.error("Error updating item", error);
        res.status(500).json({error: "Internal server error"});
    } 
}

// Delete an item
const deleteItem =async (req, res) =>{
    try{
        const item = await Item.findByIdAndDelete(req.params.id);
        if (item){
            res.status(204).send("Item deleted");
        }else{
            res.status(404).json({error: "item not found"});
        }
    }catch (error){
        console.error("Error deleting item:", error);
        res.status(500).json({error: "internal server error"})
    }
    
}

module.exports = {getAllItems, addItem, getItemById, updateItem, deleteItem}
