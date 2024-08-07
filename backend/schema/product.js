const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    pdesc: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    pimage: { type: String },
    pimage2: { type: String }
   
});

productSchema.index({ pLoc: '2dsphere' });

const Products = mongoose.model('Products', productSchema);

module.exports = Products;
