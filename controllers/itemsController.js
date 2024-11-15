const Item = require('../models/itemmodel')
const {validateItem} = require("../middlewares/validator")
// Get all items
const getAllItems = async (req, res) =>{
    try {
        const items = await Item.find().sort({_id: -1})
        res.status(200).json({success:true, message: "all items", result: items})
    }catch(error){
        console.error("Error fetching items", error);
        res.status(500).json({error: "internal server error"})
    }
}

// Add a new item
const addItem = async (req, res) =>{
    const {error} = validateItem(req.body);

    if (error){
        return res.status(400).json({
            errors: error.details.map((detail) => detail.message)
        });
    }

    try{
        const newItem = new Item({title:req.body.title});
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
// ToggleCompleted
const toggleCompletion = async(req, res) =>{
    try{
        const item = await Item.findById(req.params.id);

        if (item){
            item.completed = !item.completed;
            await item.save();
            res.json(item);
        }else{
            res.status(404).json({Error: "item not found"})
        }

    }catch (error){
        console.error("Error toggling completion", error);
        res.status(500).json({error: "Internal server error"})
    }
}
// update an item
const updateItem = async (req, res) =>{

    const {error} = validateItem(req.body);
    if (error){
        return res.status(400).json({
            errors: error.details.map((detail) => detail.message)
        });
    }    
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, { title: req.body.title }, {new: true});
        
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

module.exports = {getAllItems, addItem, getItemById, updateItem, deleteItem, toggleCompletion}
