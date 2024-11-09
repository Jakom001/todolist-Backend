let items = []

// Get all items
const getAllItems = (req, res) =>{
    res.json(items)
}

// Add a new item
const addItem =  (req, res) =>{
    const newItem = {id: items.length + 1, name:req.body.name};
    items.push(newItem);
    res.status(201).json(newItem)
};


// Get a single item by ID
const getItemById = (req,res) =>{
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item){
        res.json(item)
    }else{
        res.status(404).send("item not found");
    }
}

// update an item
const updateItem = (req, res) =>{
    const item = items.find(i => i.id === parseInt(req.params.id))

    if(item){
        item.name = req.body.name;
        res.json(item)
    }else{
        res.status(404).send("item not found")
    }
}
// Delete an item
const deleteItem = (req, res) =>{
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id))
    if(itemIndex !== -1){
        items.splice(itemIndex, 1);
        res.status(204).send("item deleted")
    }else{
        res.status(404).send("item not found");
    }
}

module.exports = {getAllItems, addItem, getItemById, updateItem, deleteItem}
