const Products = require('../schema/product');

// Helper function to handle errors
const handleError = (res, message = 'Server error') => res.status(500).send({ message });

// Search products
const searchProducts = (req, res) => {
    const search = req.query.search || '';

    Products.find({
        $or: [
            { pname: { $regex: search, $options: 'i' } },
            { pdesc: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    })
    .then(results => res.send({ message: 'Success', products: results }))
    .catch(() => handleError(res));
};

// Add a new product
const addProduct = (req, res) => {
    const { pname, pdesc, price, category } = req.body;
    const pimage = req.files?.pimage ? req.files.pimage[0].path : null;
    const pimage2 = req.files?.pimage2 ? req.files.pimage2[0].path : null;

    if (!pname || !pdesc || !price || !category) {
        return res.status(400).send({ message: 'Missing required fields.' });
    }

    const product = new Products({
        pname, pdesc, price, category, pimage, pimage2
    });

    product.save()
        .then(() => res.send({ message: 'Product saved successfully.' }))
        .catch(() => handleError(res));
};

// Get all products with optional category filter
const getProducts = (req, res) => {
    const catName = req.query.catName || '';
    const filter = catName ? { category: catName } : {};

    Products.find(filter)
        .then(result => res.send({ message: 'Success', products: result }))
        .catch(() => handleError(res));
};

// Get a product by ID
const getProductsById = (req, res) => {
    const pId = req.params.pId;

    if (!mongoose.Types.ObjectId.isValid(pId)) {
        return res.status(400).send({ message: 'Invalid product ID.' });
    }

    Products.findById(pId)
        .then(result => {
            if (!result) return res.status(404).send({ message: 'Product not found.' });
            res.send({ message: 'Success', product: result });
        })
        .catch(() => handleError(res));
};

// Get products added by a specific user (assuming userId is provided in the request body)
const myProducts = (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).send({ message: 'User ID is required.' });
    }

    Products.find({ addedBy: userId })
        .then(result => res.send({ message: 'Success', products: result }))
        .catch(() => handleError(res));
};

module.exports = {
    searchProducts,
    addProduct,
    getProducts,
    getProductsById,
    myProducts
};
